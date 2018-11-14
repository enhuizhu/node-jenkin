import Database from '../libs/database';
import {dbConfig} from '../config/dbConfig';

const _ = require('lodash');

export default class model {
  constructor() {
    switch (dbConfig.default) {
      case 'mongodb':
        this.db = require('../modules/mongodbClient').db;
        break;
      case 'mysql':
        this.db = new Database(
          dbConfig.mysql.HOST,
          dbConfig.mysql.USER,
          dbConfig.mysql.PASSWORD,
          dbConfig.mysql.DATABASE
        );
        break;
      default:
        throw new Error('unsupport database!');
    }
  }

  getObjectId(id) {
    const notification = require('../services/notification');
    const ObjectId = require('mongodb').ObjectID;

    try {
      return new ObjectId(id);
    } catch (e) {
      notification.pub('error', {success: false, msg: e.message});
      throw new Error('error on creating ObjectId');
    }
  }

  getString(obj) {
    if (_.isObject(obj)) {
      return JSON.stringify(obj);
    } else {
      return obj;
    }
  }
}
