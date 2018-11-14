describe('notification', () => {
  let notification = require('../../src/services/notification');

  it('test pub sub', () => {
    var cb = jasmine.createSpy('cb');

    notification.sub('test', cb);

    notification.pub('test', {test: 1});

    expect(cb).toHaveBeenCalledWith({test: 1});
  });
});
