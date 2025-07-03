module.exports = {
  apps: [
    {
      name: '88erp-dashboard',
      script: 'npm',
      args: 'run dev',
      cwd: '/home/sp1/88ERP/projects/web-dashboard',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      // 안정성 개선 설정
      max_restarts: 10,           // 최대 재시작 횟수
      min_uptime: '10s',          // 최소 실행 시간
      restart_delay: 4000,        // 재시작 지연 시간 (ms)
      kill_timeout: 5000,         // 종료 대기 시간
      listen_timeout: 3000,       // 리스닝 타임아웃
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      merge_logs: true,
      time: true,
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: '88erp-monitor',
      script: 'npm',
      args: 'start',
      cwd: '/home/sp1/88ERP/projects/server-monitor',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 4000
      }
    }
  ]
};