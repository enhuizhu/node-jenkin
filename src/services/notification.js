module.exports = {
  queue: [],

  pub: function(eventName, msg) {
    var matchedQs = this.getQBaseOnEventName(eventName);

    if (!matchedQs.length) {
      return false;
    }

    matchedQs.map(function(v, k) {
      v.fn(msg);
    });
  },

  getQBaseOnEventName: function(eventName) {
    return this.queue.filter(function(v, k) {
      return v.eventName === eventName;
    });
  },

  sub: function(eventName, cb) {
    var obj = {
      eventName: eventName,
      fn: cb,
    };

    this.queue.push(obj);
  },
};
