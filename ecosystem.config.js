module.exports = {
    apps: [
      {
        name: 'remix-run',
        script: './build/index.js',
        args: 'build',
        cwd: './',
        watch: false,
        instances: 'max',
        rutorestart: true,
        exec_mode: 'cluster',
        error_file: '/dev/null',
        out_file: '/dev/null',
        merge_logs: true,
        env: {
          NODE_ENV: process.env.NODE_ENV || 'production',
          RUNTIME_ENV: process.env.RUNTIME_ENV || 'production',
          PORT: process.env.PORT || 3000,
        },
      },
    ],
  };