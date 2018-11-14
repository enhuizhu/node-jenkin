import tokenService from '../services/tokenService';

export default function auth(req, res, next) {
  if (!req.query.token) {
    res.send({
      success: false,
      msg: 'token is missing',
    });
  } else {
    tokenService.validateToken(req.query.token).then(result => {
      if (result.success) {
        next();
      } else {
        res.send(result);
      }
    });
  }
}
