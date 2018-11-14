export default class route {
  constructor(app) {
    this.controllers = {};
    this.app = app;
    this.setRoute();
  }

  response(obj, req, res, params = []) {
    if (typeof this.controllers[obj.controller] === 'undefined') {
      let Controller = require('../controllers/' + obj.controller);
      this.controllers[obj.controller] = new Controller();
    }

    this.controllers[obj.controller].setReqRes(req, res);
    this.controllers[obj.controller][obj.action](...params);
  }

  setRoute() {
    this.app.get('/', (req, res) => {
      this.response(
        {
          controller: 'main',
          action: 'index',
        },
        req,
        res
      );
    });

    this.app.get('/swap/getSwapSavedSearch', (req, res) => {
      this.response({
        controller: 'swap',
        action: 'getSwap',
      }, 
      req, 
      res);
    });

    this.app.post('/swap/saveSwapSearch', (req, res) => {
      this.response({
        controller: 'swap',
        action: 'saveSwapSearch',
      }, 
      req, 
      res
      );
    });

    this.app.delete('/swap/delete/:name', (req, res) => {
      this.response({
        controller: 'swap',
        action: 'deleteSearch'
      }, req, res, [req.params.name])
    })
  }
}
