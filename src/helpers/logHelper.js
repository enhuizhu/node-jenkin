const color = require('colors');

class Log {
  static error(msg) {
    console.log(color.red(msg));
  }

  static info(msg) {
    console.log(`info: ${msg}`);
  }

  static success(msg) {
    console.log(color.green(msg));
  }
}

module.exports = Log;