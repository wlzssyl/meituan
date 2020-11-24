// const koa = require('koa')
import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'

import dbConfig from './server/dbs/config.js'
import passport from './server/interface/utils/passport.js'
import users from './server/interface/users.js'

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(session({
  key: 'mt',
  prefix: 'mt:uid',
  store: new Redis()//redis要启动
}))
//host扩展处理
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(json())

//连接数据库，数据库也要启动
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})
//passport初始化
app.use(passport.initialize())
app.use(passport.session())


// 传入配置初始化 Nuxt.js 实例
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// 在开发模式下进行编译
if (config.dev) {
  new Builder(nuxt).build()
}

//引入路由
app.use(users.routes()).use(users.allowedMethods())


// 监听指定端口
app.listen(port, '0.0.0.0')
console.log('服务器运行于 localhost:' + port)
consola.ready({ message: `Server listening on http://${host}:${port}`, badge: true })