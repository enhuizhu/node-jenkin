const { spawn, exec } = require('child_process');
const Log = require('./logHelper');

const sp = (command, params) => {
  const child = spawn(command, params);
  Log.success(`excuteing ${command} ${params.join(' ')}`);
  // console.log('child', child);
  
  child.stdout.on('data', (data) => {
    Log.info(data.toString('utf8'));
  });

  child.stderr.on('data', (data) => {
    if (data.indexOf('WARN') !== -1) {
      return ;
    }

    Log.error('the command with error:')
    Log.error(command)
    Log.error(params.join(' '));
    Log.error(data.toString('utf8'));
  });

  return new Promise((resolve, reject) => {
    child.on('close', (code) => {
      Log.info(`child process exited with code ${code}`);
      
      resolve(code);
    });
  });
};

const ex = (command, callback) => {
  exec(command, {maxBuffer: 1024 * 1000}, (err, stdout, stderr) => {
    if (err) {
      Log.error(err);
      
      if (typeof callback === 'function') {
        callback(err);
      }
      
      return;
    }
    
    // Log.info(stdout);
    if (typeof callback === 'function') {
      callback(false, stdout);
    }
  });
}

module.exports = {
  spawn: sp,
  exec: ex
}
