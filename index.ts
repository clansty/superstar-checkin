import validateCookie from './requests/validateCookie'
import {info, success, warn} from './utils/log'
import * as db from './providers/db'
import {loginBot} from './providers/bot'
import loginAndSaveInfo from './utils/loginAndSaveInfo'
import axios from 'axios'
import {imConnect} from './providers/easemob'
import config from './providers/config'

(async () => {
    //初始化数据库连接和 bot
    axios.defaults.proxy = false
    await db.connect()
    await loginBot()
    //验证及获取 cookie
    let isCookieValid = false
    let cookie = await db.getMeta<string>('cookie')
    if (await db.getMeta<string>('username') !== config.username) {
        // 如果用户名不一致，则不应该用老的 cookie
        cookie = ''
    }
    if (cookie) {
        isCookieValid = await validateCookie(cookie)
        if (isCookieValid) info('Cookie 有效')
        else warn('Cookie 无效')
    }
    if (!isCookieValid) {
        cookie = await loginAndSaveInfo()
    }
    //登录步骤完成
    const schoolname = await db.getMeta<string>('schoolname')
    const name = await db.getMeta<string>('name')
    success(`欢迎来自 ${schoolname} 的 ${name}`)
    //连接 IM
    info('准备连接 IM')
    await imConnect()
    info('系统初始化完毕')
})()
