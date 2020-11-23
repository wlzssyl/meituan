// const koa = require('koa')
import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')



// import dbConfig from './server/dbs/config'
// import passport from './server/interface/utils/passport'
// import users from './server/interface/'

const app = require('express')()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// 传入配置初始化 Nuxt.js 实例
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// 在开发模式下进行编译
if (config.dev) {
  new Builder(nuxt).build()
}

// 监听指定端口
app.listen(port, '0.0.0.0')
console.log('服务器运行于 localhost:' + port)
consola.ready({message: `Server listening on http://${host}:${port}`, badge: true})