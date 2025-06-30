const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const PORT = 4000; // 별도 포트 사용

// HTTP 서버 생성
const server = http.createServer(app);

// WebSocket 서버 생성 (실시간 로그 스트리밍)
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// PM2 프로세스 상태 확인
app.get('/api/status', (req, res) => {
  exec('pm2 jlist', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    try {
      const processes = JSON.parse(stdout);
      const dashboardProcess = processes.find(p => p.name === '88erp-dashboard');
      
      res.json({
        status: dashboardProcess?.pm2_env?.status || 'not found',
        memory: dashboardProcess?.monit?.memory || 0,
        cpu: dashboardProcess?.monit?.cpu || 0,
        uptime: dashboardProcess?.pm2_env?.pm_uptime || 0,
        restarts: dashboardProcess?.pm2_env?.restart_time || 0,
        pid: dashboardProcess?.pid || null
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to parse PM2 data' });
    }
  });
});

// 로그 가져오기
app.get('/api/logs/:type', (req, res) => {
  const { type } = req.params;
  const lines = req.query.lines || 100;
  
  let command = `pm2 logs 88erp-dashboard --lines ${lines} --nostream`;
  
  if (type === 'error') {
    command = `pm2 logs 88erp-dashboard --err --lines ${lines} --nostream`;
  } else if (type === 'out') {
    command = `pm2 logs 88erp-dashboard --out --lines ${lines} --nostream`;
  }
  
  exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    const logs = (stdout + stderr)
      .split('\\n')
      .filter(line => line.trim())
      .map(line => line.replace(/\\x1b\\[[0-9;]*m/g, ''));
    
    res.json({ logs });
  });
});

// 서버 재시작
app.post('/api/restart', (req, res) => {
  exec('pm2 restart 88erp-dashboard', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    res.json({ 
      success: true, 
      message: 'Server restarted successfully',
      output: stdout 
    });
  });
});

// 서버 중지
app.post('/api/stop', (req, res) => {
  exec('pm2 stop 88erp-dashboard', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    res.json({ 
      success: true, 
      message: 'Server stopped successfully',
      output: stdout 
    });
  });
});

// 서버 시작
app.post('/api/start', (req, res) => {
  exec('pm2 start 88erp-dashboard', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    res.json({ 
      success: true, 
      message: 'Server started successfully',
      output: stdout 
    });
  });
});

// 로그 삭제
app.post('/api/flush', (req, res) => {
  exec('pm2 flush 88erp-dashboard', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    res.json({ 
      success: true, 
      message: 'Logs flushed successfully',
      output: stdout 
    });
  });
});

// WebSocket 연결 처리 (실시간 로그 스트리밍)
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  
  // PM2 로그 스트리밍
  const logStream = exec('pm2 logs 88erp-dashboard --raw');
  
  logStream.stdout.on('data', (data) => {
    ws.send(JSON.stringify({ 
      type: 'log',
      data: data.toString(),
      timestamp: new Date().toISOString()
    }));
  });
  
  logStream.stderr.on('data', (data) => {
    ws.send(JSON.stringify({ 
      type: 'error',
      data: data.toString(),
      timestamp: new Date().toISOString()
    }));
  });
  
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
    logStream.kill();
  });
});

// 기본 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`🚀 Server Monitor running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
});