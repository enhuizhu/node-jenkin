import Db from '../src/libs/database.js';
import {dbConfig} from '../src/config/dbConfig.js';

describe('test database', function() {
  var database;

  beforeEach(function() {
    database = new Db(
      dbConfig.HOST,
      dbConfig.USER,
      dbConfig.PASSWORD,
      dbConfig.DATABASE
    );
  });

  it('test database constructor', function() {
    // console.info("test db!");
    database
      .query('select * from category')
      .then(function(rows) {
        console.info('rows is:', rows);
      })
      .catch(function(err) {
        console.info('err is here:', err);
      });
  });
});
