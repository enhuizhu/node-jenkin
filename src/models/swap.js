import model from '../core/model.js';

module.exports = class swap extends model{
  constructor() {
    super();

    this.collection = this.db.collection('swap');
  }

  saveSwapSearch(username, nameOfSearch, filters) {
    return new Promise((resolve, reject) => {
      this.getSwap(username).then(docs => {
        const docObj = JSON.parse(docs);

        if (docObj.length === 0) {
          this.createSwap(username, nameOfSearch, filters)
            .then(resolve).catch(reject);
        } else {
          this.updateSwap(username, nameOfSearch, filters)
            .then(resolve).catch(reject);
        }
      }).catch(reject);
    });
  }

  createSwap(username, nameOfSearch, filters) {
    return new Promise((resolve, reject) => {
      this.collection.insertOne({
        username,
        swap: {
          [nameOfSearch]: filters,
        },
      }, (err, r) => {
        this.standardResponse(err, r, resolve, reject);
      });
    });
  }

  updateSwap(username, nameOfSearch, filters) {
    return new Promise((resolve, reject) => {
      this.collection.updateOne({username}, {
        $set: {
          [`swap.${nameOfSearch}`]: filters,
        },
      }, (err, r) => {
        this.standardResponse(err, r, resolve, reject);
      });
    });
  }

  getSwap(username) {
    return new Promise((resolve, reject) => {
      this.collection.find({username}).toArray((err, docs) => {
        this.standardResponse(err, docs, resolve, reject);
      });
    });
  }

  deleteSearch(username, nameOfSearch) {
    return new Promise((resolve, reject) => {
      this.collection.updateOne({
        username
      }, {
        $unset: {
          [`swap.${nameOfSearch}`]: ""
        }
      }, (err, r) => {
        this.standardResponse(err, r, resolve, reject);
      });
    });
  }

  standardResponse(err, r, resolve, reject) {
    if (err) {
      reject(this.getString(err));
    } else {
      resolve(this.getString(r));
    }
  }
    
};
