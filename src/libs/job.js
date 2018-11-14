import fileHelper from '../helpers/fileHelper';
import execHelper from '../helpers/execHelper';

module.exports = class Job {
  constructor(config) {
    this.config = config;
    // check update every five seconds
    this.heartBeatPeriod = 5000;
    // avoid multiple scripts running
    this.isRunningScript = false;
    this.timeout = null;
    this.init();
  }

  init() {
    // should check if folder exist
    this.projectdPath = `${__dirname}/../../projects/${this.config._id}`;

    if (!fileHelper.folderExists(this.projectdPath)) {
      execHelper.spawn('svn', ['checkout', this.config.svn, this.projectdPath])
        .then(this.startJob.bind(this, this.config));
    } else {
      this.startJob();
    }
  }

  startJob() {
    if (this.isRunningScript) {
      this.timeout = setTimeout(this.startJob.bind(this), this.heartBeatPeriod);
      return ;
    }

    this.checkUpdate().then(hasUpdate => {
      if (hasUpdate) {
        this.isRunningScript = true;

        this.runScript(() => {
          this.timeout = setTimeout(this.startJob.bind(this), this.heartBeatPeriod);
          this.isRunningScript = false;
        });
      } else {
        this.timeout = setTimeout(this.startJob.bind(this), this.heartBeatPeriod);
      }
    }).catch(console.error)
  }

  checkUpdate() {
    return new Promise((resolve, reject) => {
      execHelper.exec(`svn info ${this.projectdPath} -r HEAD | grep -i "Last Changed Rev"`, (result1) => {
        if (err) {
          reject(err);
        }
        console.log('result1', result1);
        execHelper.exec(`svn info ${this.projectdPath} | grep -i "Last Changed Rev"`, (err, result2) => {
          if (err) {
            reject(err);
          }
          
          console.log('result2', result2);
          if (result1 == result2) {
            resolve(true);
          }
        });
      });
    });
  }

  runScript(callback) {
    execHelper.exec(`cd ${this.projectdPath} && ${this.config.script}`, (err, result) => {
      console.log('error', err);
      console.log('result', result);
      callback(result);
    });
  }

  stopJob() {
    clearTimeout(this.timeout);
  }
}