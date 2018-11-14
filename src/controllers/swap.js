import controller from '../core/controller';
import SwapModel from '../models/swap';

module.exports = class swap extends controller {
  constructor(req, res) {
    super(req, res);
    this.swapModel = new SwapModel();
    this.sendErrorMsg = this.sendErrorMsg.bind(this);
    this.sendSuccessMsg = this.sendSuccessMsg.bind(this);
  }

  saveSwapSearch() {
    this.swapModel.saveSwapSearch(
      this.req.query.username,
      this.req.query.name,
      this.req.body
    ).then(this.sendSuccessMsg).catch(this.sendErrorMsg);
  }

  getSwap() {
    this.swapModel.getSwap(this.req.query.username).then(docs => {
      const docsObj = JSON.parse(docs);

      if (docsObj.length === 0) {
        this.res.send({});
      } else {
        this.res.send(docsObj[0].swap);
      }
    }).catch(this.sendErrorMsg);
  }

  deleteSearch(searchName) {
    this.swapModel.deleteSearch(this.req.query.username, searchName)
      .then(this.sendSuccessMsg).catch(this.sendErrorMsg);
  }
};
