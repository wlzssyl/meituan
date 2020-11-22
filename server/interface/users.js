import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'

import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

let router = new Router({
  prefix: '/users'
})

let Store = new Redis().client

/**注册接口********************************* */
router.post('/signup', async (ctx) => {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body//获取post请求携带的信息，用ctx.request.body

  if (code) {
    //将验证码code和验证时长expire从redis中取出
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {//检测验证码
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: ' 验证码错误'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }

  /**监测用户名是否重复 */
  let user = await User.find({
    username
  })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '该用户名已被注册'
    }
    return
  }

  /**以上监测都通过了，将注册用户信息写入数据库 */
  let nuser = await User.create({
    username,
    password,
    email
  })
  if (nuser) {
    //如果写入成功了就自动登录，同时抛出信息
    let res = await axios.post('/users/signin', {
      username,
      password
    })
    if (res.data && res.data.code === 0) {
      cyx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error(可能是网络连接出现问题)'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败(可能是未能写入库)'
    }
  }
})

/**登录接口************************************ */
router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', (err, user, info, status) => {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登陆成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

/**验证码验证接口************************** */
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodename:${username}`, 'expire')
  if (saveExpire && Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，请一分钟后再试'
    }
    return false
  }
  //创建smtp服务
  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  //对外发送信息
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    //对那个email发送验证邮件
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  //发送邮件的内容
  let mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`,
    to: ko.email,
    subject: 'meituan账号注册验证码',//邮件主题
    html: `您在meituan注册账号的验证码为${ko.code}`//邮件内容
  }
  //发送邮件请求
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error()
    } else {
      //将该用户名对应的验证码，有效时间，邮箱地址存到redis中
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，有效时间一分钟。'
  }
})

//退出登录接口
router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  //检查是否是登录状态
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

//获取用户名接口
