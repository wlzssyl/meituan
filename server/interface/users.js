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
})