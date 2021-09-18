import config from './providers/config'
import validateCookie from './requests/validateCookie'
import {info, warn} from './utils/log'
import * as db from './providers/db'
import {bot, loginBot} from './providers/bot'
import loginAndSaveInfo from './utils/loginAndSaveInfo'
import axios from 'axios'

(async () => {
    //初始化数据库连接和 bot
    axios.defaults.proxy = false
    await db.connect(config.mongodb, config.dbName)
    await loginBot()
    console.info('系统初始化完毕')
    //验证及获取 cookie
    let isCookieValid = false
    let cookie = await db.getMeta<string>('cookie')
    if (cookie) {
        isCookieValid = await validateCookie(cookie)
        if (isCookieValid)
            info('Cookie 有效')
        else
            warn('Cookie 无效')
    }
    if (!isCookieValid) {
        cookie = await loginAndSaveInfo()
    }
    //登录步骤完成
    const schoolname = await db.getMeta<string>('schoolname')
    const name = await db.getMeta<string>('name')
    info(`欢迎来自 ${schoolname} 的 ${name}`)


})()
