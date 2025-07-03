module.exports = {
  apps: [
    {
      name: '88erp-all-monitor',
      script: 'monitor-all-services.js',
      cwd: '/home/sp1/88ERP/projects/server-monitor',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
        PORT: 4001
      }
    }
  ]
};