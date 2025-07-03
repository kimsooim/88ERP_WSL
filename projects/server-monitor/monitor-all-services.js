const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 4001; // 새로운 포트 사용

app.use(cors());
app.use(express.json());

// 캐시 설정 (과부하 방지)
let statusCache = null;
let lastCacheTime = 0;
const CACHE_DURATION = 5000; // 5초 캐시

// 모든 서비스 상태 확인 (가벼운 버전)
app.get('/api/all-status', async (req, res) => {
  const now = Date.now();
  
  // 캐시 사용
  if (statusCache && (now - lastCacheTime) < CACHE_DURATION) {
    return res.json(statusCache);
  }

  try {
    const status = {
      timestamp: new Date().toISOString(),
      services: {}
    };

    // 1. PM2 프로세스들 확인
    const pm2Status = await new Promise((resolve) => {
      exec('pm2 jlist', (error, stdout) => {
        if (error) {
          resolve({ error: error.message });
        } else {
          try {
            const processes = JSON.parse(stdout);
            const result = {};
            
            processes.forEach(p => {
              result[p.name] = {
                status: p.pm2_env.status,
                memory: Math.round(p.monit.memory / 1024 / 1024) + 'MB',
                cpu: p.monit.cpu + '%',
                uptime: Math.round((Date.now() - p.pm2_env.pm_uptime) / 1000 / 60) + 'min',
                restarts: p.pm2_env.restart_time
              };
            });
            
            resolve(result);
          } catch (err) {
            resolve({ error: 'PM2 parse error' });
          }
        }
      });
    });

    status.services.pm2 = pm2Status;

    // 2. MCP 서버 상태 확인 (간단히 포트 체크)
    const mcpPorts = {
      'claude-code-sse': 27606,
      'mcp-memory': 3001,
      'mcp-filesystem': 3002,
      'mcp-terminal': 3003
    };
    
    // Claude Code 프로세스 체크
    const claudeCodeCheck = await new Promise((resolve) => {
      exec('ps aux | grep -E "claude-code|CLAUDE_CODE" | grep -v grep | wc -l', (error, stdout) => {
        const count = parseInt(stdout.trim());
        resolve({
          status: count > 0 ? 'online' : 'offline',
          processes: count
        });
      });
    });

    status.services.mcp = {
      'claude-code': claudeCodeCheck
    };
    
    for (const [name, port] of Object.entries(mcpPorts)) {
      const isRunning = await new Promise((resolve) => {
        exec(`lsof -i :${port} | grep LISTEN`, (error) => {
          resolve(!error);
        });
      });
      
      status.services.mcp[name] = {
        status: isRunning ? 'online' : 'offline',
        port: port
      };
    }

    // 3. 시스템 리소스 (간단히)
    const systemInfo = await new Promise((resolve) => {
      exec('free -m | grep Mem && df -h / | tail -1', (error, stdout) => {
        if (error) {
          resolve({ error: 'System check failed' });
        } else {
          const lines = stdout.trim().split('\n');
          const memLine = lines[0].split(/\s+/);
          const diskLine = lines[1].split(/\s+/);
          
          resolve({
            memory: {
              used: memLine[2] + 'MB',
              total: memLine[1] + 'MB',
              percent: Math.round((memLine[2] / memLine[1]) * 100) + '%'
            },
            disk: {
              used: diskLine[2],
              total: diskLine[1],
              percent: diskLine[4]
            }
          });
        }
      });
    });
    
    status.services.system = systemInfo;

    // 4. 최근 에러 확인 (마지막 5개만)
    const errorLogs = await new Promise((resolve) => {
      exec('tail -n 5 /home/sp1/88ERP/projects/web-dashboard/logs/pm2-error.log 2>/dev/null | grep -i error || echo "No recent errors"', 
        (error, stdout) => {
          resolve(stdout.trim().split('\n').slice(-5));
        }
      );
    });
    
    status.recentErrors = errorLogs;

    // 캐시 업데이트
    statusCache = status;
    lastCacheTime = now;

    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 간단한 대시보드 HTML
app.get('/', async (req, res) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>88ERP Service Monitor</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 20px;
            background: #f5f5f5;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto;
        }
        .service-card {
            background: white;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .status-online { color: #4CAF50; font-weight: bold; }
        .status-offline { color: #f44336; font-weight: bold; }
        .status-stopped { color: #ff9800; font-weight: bold; }
        .metrics { 
            display: flex; 
            gap: 20px; 
            margin-top: 10px;
            font-size: 14px;
        }
        .metric { 
            padding: 5px 10px;
            background: #f0f0f0;
            border-radius: 4px;
        }
        .errors {
            background: #ffebee;
            border-left: 4px solid #f44336;
            padding: 10px;
            margin-top: 20px;
            font-family: monospace;
            font-size: 12px;
        }
        h1 { color: #333; }
        h2 { color: #666; font-size: 18px; }
        .refresh-info { 
            color: #999; 
            font-size: 12px; 
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🖥️ 88ERP Service Monitor</h1>
        <div id="status">Loading...</div>
        <div class="refresh-info">자동 새로고침: 10초마다 | 캐시: 5초</div>
    </div>

    <script>
        async function updateStatus() {
            try {
                const response = await fetch('/api/all-status');
                const data = await response.json();
                
                let html = '<div class="last-update">마지막 업데이트: ' + new Date().toLocaleTimeString() + '</div>';
                
                // PM2 서비스들
                html += '<h2>PM2 Services</h2>';
                for (const [name, info] of Object.entries(data.services.pm2)) {
                    if (info.error) continue;
                    
                    const statusClass = info.status === 'online' ? 'status-online' : 
                                      info.status === 'stopped' ? 'status-stopped' : 'status-offline';
                    
                    html += \`
                        <div class="service-card">
                            <strong>\${name}</strong> 
                            <span class="\${statusClass}">\${info.status}</span>
                            <div class="metrics">
                                <span class="metric">메모리: \${info.memory}</span>
                                <span class="metric">CPU: \${info.cpu}</span>
                                <span class="metric">실행시간: \${info.uptime}</span>
                                <span class="metric">재시작: \${info.restarts}회</span>
                            </div>
                        </div>
                    \`;
                }
                
                // MCP 서비스들
                html += '<h2>MCP Services</h2>';
                for (const [name, info] of Object.entries(data.services.mcp)) {
                    const statusClass = info.status === 'online' ? 'status-online' : 'status-offline';
                    
                    html += \`
                        <div class="service-card">
                            <strong>\${name}</strong> 
                            <span class="\${statusClass}">\${info.status}</span>
                            <span class="metric">포트: \${info.port}</span>
                        </div>
                    \`;
                }
                
                // 시스템 리소스
                html += '<h2>System Resources</h2>';
                html += \`
                    <div class="service-card">
                        <strong>메모리</strong>: \${data.services.system.memory.used} / \${data.services.system.memory.total} 
                        (\${data.services.system.memory.percent})
                        <br>
                        <strong>디스크</strong>: \${data.services.system.disk.used} / \${data.services.system.disk.total} 
                        (\${data.services.system.disk.percent})
                    </div>
                \`;
                
                // 최근 에러
                if (data.recentErrors && data.recentErrors.length > 0) {
                    html += '<h2>Recent Errors</h2>';
                    html += '<div class="errors">';
                    data.recentErrors.forEach(error => {
                        if (error && error !== 'No recent errors') {
                            html += error + '<br>';
                        }
                    });
                    html += '</div>';
                }
                
                document.getElementById('status').innerHTML = html;
            } catch (error) {
                document.getElementById('status').innerHTML = 
                    '<div class="errors">Error loading status: ' + error.message + '</div>';
            }
        }
        
        // 초기 로드
        updateStatus();
        
        // 10초마다 새로고침
        setInterval(updateStatus, 10000);
    </script>
</body>
</html>
  `;
  
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`🚀 All Services Monitor running on http://localhost:${PORT}`);
  console.log(`📊 가벼운 모니터링 with 5초 캐싱`);
});