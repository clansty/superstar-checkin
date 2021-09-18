import {info} from './log'
import login from '../requests/login'
import config from '../providers/config'
import * as db from '../providers/db'
import getUserInfo from '../requests/getUserInfo'

export default async () => {
    //获取 cookie
    info('正在获取 Cookie')
    const getCookieRes = await login(config.username, config.password)
    const cookie = getCookieRes.cookie
    await db.setMeta('cookie', cookie)
    info('Cookie 获取成功，正在获取用户信息')
    const userInfo = await getUserInfo(cookie)
    const {schoolname, name, uid} = userInfo
    await db.setMeta('schoolname', schoolname)
    await db.setMeta('name', name)
    await db.setMeta('uid', uid)
    return cookie
}
