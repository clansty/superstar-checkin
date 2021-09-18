import * as fs from 'fs'
import path from 'path'
import login from './requests/login'
import config from './providers/config'
import validateCookie from './requests/validateCookie'
import {info, warn} from './utils/log'

(async () => {
    //创建 data 文件夹，保存 cookie 之类的
    if (!fs.existsSync('data'))
        fs.mkdirSync('data')
    //验证及获取 cookie
    const COOKIE_FILE = path.join('data', 'cookie')
    let isCookieValid = false
    let cookie = ''
    if (fs.existsSync(COOKIE_FILE)) {
        cookie=fs.readFileSync(COOKIE_FILE,'utf-8')
        isCookieValid=await validateCookie(cookie)
        if(isCookieValid)
            info('Cookie 有效')
        else
            warn('Cookie 无效')
    }
    if (!isCookieValid) {
        //获取 cookie
        info('正在获取 Cookie')
        const getCookieRes = await login(config.username, config.password)
        cookie = getCookieRes.cookie
        fs.writeFile(COOKIE_FILE, getCookieRes.cookie, 'utf-8', () => {
        })
    }
})()
