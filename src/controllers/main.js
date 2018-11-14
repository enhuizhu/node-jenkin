import controller from '../core/controller';

module.exports = class main extends controller {
  constructor(req, res) {
    super(req, res);
  }

  index() {
    this.res.end('hello, the world');
  }
};
