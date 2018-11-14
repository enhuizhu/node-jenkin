import mysql from 'mysql';
// import Q from "q";

export default class database {
  constructor(HOST, USER, PASSWORD, DATABASE) {
    this.connection = mysql.createConnection({
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE,
    });

    this.connection.connect();
  }

  query(queryStr) {
    let _self = this;

    return new Promise(function(resolve, reject) {
      _self.connection.query(queryStr, function(err, rows, fields) {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
      });
    });
  }
}
