import {info} from './utils/log'
import * as db from './providers/db'
import {loginBot} from './providers/bot'
import axios from 'axios'
import {imConnect} from './providers/easemob'
import accountsManager from './utils/accountsManager'
import config from './providers/config'

(async () => {
    //初始化数据库连接和 bot
    axios.defaults.proxy = false
    await db.connect()
    await loginBot()
    //验证及获取 cookie
    await accountsManager.checkCookies()
    //登录步骤完成，使用第一个帐号登录环信
    const meta = await accountsManager.getAccountData(config.accounts[0].username)
    info(`正在使用 ${meta.name} 的帐号登录环信`)
    //连接 IM
    info('准备连接 IM')
    await imConnect(meta.cookie, meta.uid)
    info('系统初始化完毕')
})()
