module.exports = {
  apps: [
    {
      name: 'ka-globe-backend',
      cwd: './backend',
      script: 'npm',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
      error_file: './logs/backend-err.log',
      out_file: './logs/backend-out.log',
      time: true,
    },
    {
      name: 'ka-globe-frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'run preview -- --host 0.0.0.0 --port 3000',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env_production: {
        NODE_ENV: 'production',
        VITE_API_URL: 'http://34.234.97.121:4000/api'
      },
      error_file: './logs/frontend-err.log',
      out_file: './logs/frontend-out.log',
      time: true,
    },
  ],
};