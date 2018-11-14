import {dbConfig} from '../config/dbConfig';
// Retrieve
const MongoClient = require('mongodb').MongoClient;

const getConnectionStr = (config) => {
  let connectionStr = 'mongodb://';

  if (config.USER && config.PASSWORD) {
    connectionStr += `${config.USER}:${config.PASSWORD}@`; 
  }

  connectionStr += `localhost:27017/${config.DATABASE}`

  return connectionStr;
}

MongoClient.connect(
  getConnectionStr(dbConfig.mongodb),
  {native_parser: true},
  function(err, db) {
    if (!err) {
      console.log('db connect successfully!');
      MongoClient.db = db;
    } else {
      console.log('connect to db fail, the error message is:', err);
    }
  }
);

module.exports = MongoClient;
