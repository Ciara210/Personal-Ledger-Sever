'use strict';

const defaultAvatar = '//s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png'

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body

    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: 'Account password cannot be empty',
        data: null
      }
      return
    }

    const userInfo = await ctx.service.user.getUserByName(username)

    if (userInfo && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: 'Account name has been registered, please re-enter',
        data: null
      }
      return
    }

    const result = await ctx.service.user.register({
      username,
      password,
      signature: 'World Peace.',
      avatar: defaultAvatar
    });

    if (result) {
      ctx.body = {
        code: 200,
        msg: 'Register successfully',
        data: null
      }
    } else {
      ctx.body = {
        code: 500,
        msg: 'Registration failed',
        data: null
      }
    }
  }

  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body
    const userInfo = await ctx.service.user.getUserByName(username)
    if (!userInfo || !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: 'Account does not exist',
        data: null
      }
      return
    }

    if (userInfo && password != userInfo.password) {
      ctx.body = {
        code: 500,
        msg: 'Account password error',
        data: null
      }
      return
    }

    const token = app.jwt.sign({
      id: userInfo.id,
      username: userInfo.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // token 24 hours
    }, app.config.jwt.secret);
    
    ctx.body = {
      code: 200,
      message: 'Login successful',
      data: {
        token
      },
    };
  }

  async getUserInfo() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    const userInfo = await ctx.service.user.getUserByName(decode.username)
    ctx.body = {
      code: 200,
      msg: 'Request successful',
      data: {
        id: userInfo.id,
        username: userInfo.username,
        signature: userInfo.signature || '',
        avatar: userInfo.avatar || defaultAvatar
      }
    }
  }

  async editUserInfo () {
    const { ctx, app } = this;
    const { signature = '', avatar = '' } = ctx.request.body

    try {
      let user_id
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return
      user_id = decode.id

      const userInfo = await ctx.service.user.getUserByName(decode.username)
      const result = await ctx.service.user.editUserInfo({
        ...userInfo,
        signature,
        avatar
      });

      ctx.body = {
        code: 200,
        msg: 'Request successful',
        data: {
          id: user_id,
          signature,
          username: userInfo.username,
          avatar
        }
      }
    } catch (error) {
      
    }
  }

  async modifyPass () {
    const { ctx, app } = this;
    const { old_pass = '', new_pass = '', new_pass2 = '' } = ctx.request.body

    try {
      let user_id
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return
      if (decode.username == 'admin') {
        ctx.body = {
          code: 400,
          msg: 'Admin account, no password changes allowed!',
          data: null
        }
        return
      }
      user_id = decode.id
      const userInfo = await ctx.service.user.getUserByName(decode.username)

      if (old_pass != userInfo.password) {
        ctx.body = {
          code: 400,
          msg: 'Original password error',
          data: null
        }
        return
      }

      if (new_pass != new_pass2) {
        ctx.body = {
          code: 400,
          msg: 'New password inconsistency',
          data: null
        }
        return
      }

      const result = await ctx.service.user.modifyPass({
        ...userInfo,
        password: new_pass,
      })

      ctx.body = {
        code: 200,
        msg: 'Request successful',
        data: null
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: 'System Error',
        data: null
      }
    }
  }

  async verify() {
    const { ctx, app } = this;
    const { token } = ctx.request.body
    console.log(ctx.state.user)
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    console.log('decode', decode)
    ctx.body = 'success gays'
  }
}

module.exports = UserController;