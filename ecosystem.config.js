module.exports = {
  apps: [
    {
      name: 'toward-book',
      exec_interpreter: 'babel-node',
      script: './app.js',
      instance: 0,
      exec_mode: 'cluster',
      merge_log: true,
      wait_ready: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
