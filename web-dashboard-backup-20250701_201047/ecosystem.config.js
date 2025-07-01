module.exports = {
  apps: [
    {
      name: '88erp-dashboard',
      script: 'npm',
      args: 'run dev',
      cwd: '/home/sp1/88ERP/projects/web-dashboard',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
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