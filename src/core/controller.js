export default class controller {
  constructor() {
    this.models = {};
    this.setEvents();
    // this.setReqRes(req, res);
  }

  setEvents() {
    const notification = require('../services/notification');

    notification.sub('error', msg => {
      this.res.end(JSON.stringify(msg));
    });
  }

  setReqRes(req, res) {
    this.req = req;
    this.res = res;
  }

  loadModel(modelName) {
    const Model = require('../models/' + modelName);
    this.models[modelName] = new Model();
  }

  checkRawbody() {
    try {
      var obj = JSON.parse(this.req.rawBody);
    } catch (e) {
      this.res.end('invalid JSON');
      return;
    }

    return obj;
  }

  sendErrorMsg(msg) {
    this.res.send({
      success: false,
      msg: msg || 'error happened with mogodb',
    });
  }

  sendSuccessMsg(result) {
    let obj = {
      success: true,
    };

    if (result) {
      obj.data = result;
    }

    this.res.send(obj);
  }

  sendStandApiResponse(result) {
    if (!result) {
      this.sendErrorMsg();
    } else if (typeof result === 'string') {
      this.sendErrorMsg(result);
    } else {
      this.sendSuccessMsg(result);
    }
  }
}
