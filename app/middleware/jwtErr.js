'use strict';

module.exports = (options) => {
  return async function jwtErr(ctx, next) {
    const token = ctx.request.header.authorization; 
    let decode
    if(token != 'null' && token) {
      try {
        decode = ctx.app.jwt.verify(token, options.secret); // Verify token
        await next();
      } catch (error) {
        console.log('error', error)
        ctx.status = 200;
        ctx.body = {
          msg: 'The token has expired, please log in again',
          code: 401,
        }
        return;
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        msg: 'token does not exist',
      };
      return;
    }
  }
}