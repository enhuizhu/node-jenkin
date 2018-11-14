let fs = require('fs');

module.exports = {
  getFileExtension: fileName => {
    let segs = fileName.split('.');

    if (segs.length > 1) {
      return segs.pop();
    }

    return false;
  },

  fileExists: filePath => {
    try {
      return fs.statSync(filePath).isFile();
    } catch (e) {
      console.info('error', e.message);
      return false;
    }
  },

  getFileSize: file => {
    try {
      let stats = fs.statSync(file);
      let fileSizeInBytes = stats['size'];

      return fileSizeInBytes;
    } catch (e) {
      return false;
    }
  },

  deleteFile: (file, cb) => {
    fs.unlink(file, err => {
      if (err) {
        cb(false);
      } else {
        cb(true);
      }
    });
  },
};
