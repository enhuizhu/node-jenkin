import Controller from '../../src/core/controller';

describe('test core controller', () => {
  let controllerIns = new Controller();
  let helper = require('../helper');

  controllerIns.setReqRes({}, helper.getRes());

  it('funciton:sendSuccessMsg', () => {
    spyOn(controllerIns.res, 'send');
    controllerIns.sendSuccessMsg();
    expect(controllerIns.res.send).toHaveBeenCalledWith({
      success: true,
    });

    controllerIns.sendSuccessMsg([{title: 1}, {title: 2}]);
    expect(controllerIns.res.send).toHaveBeenCalledWith({
      success: true,
      data: [{title: 1}, {title: 2}],
    });
  });
});
