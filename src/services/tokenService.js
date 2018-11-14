import {apiConfig} from '../config/apiConfig';

let jwt = require('jwt-simple');
let moment = require('moment');
let q = require('q');

let tokenService = {
  getToken: username => {
    let token = jwt.encode(
      {
        id: username,
        exp: +moment().add(7, 'days')._d,
      },
      apiConfig.tokenSecrect
    );

    return token;
  },

  validateToken: token => {
    let deferred = q.defer();
    let result = {};

    try {
      let decoded = jwt.decode(token, apiConfig.tokenSecrect);
      let username = decoded.id;
      let expireTime = decoded.exp;
      let UsersModel = require('../models/users');
      let users = new UsersModel();
      /**
       * should check if username already exist
       **/
      users.isUserExist(username, response => {
        if (!response || response.length === 0) {
          result = {
            success: false,
            msg: 'invalid token',
          };
        } else if (expireTime < +new Date()) {
          result = {
            success: false,
            msg: 'token expired',
          };
        } else {
          result = {
            success: true,
            msg: 'ok',
          };
        }

        deferred.resolve(result);
      });
    } catch (e) {
      result = {
        success: false,
        msg: 'invalid token',
      };

      deferred.resolve(result);
    }

    return deferred.promise;
  },
};

export default tokenService;
