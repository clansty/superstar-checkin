import handleGeoCheckin from './handleGeoCheckin'
import handlerSimpleCheckin from './handleSimpleCheckin'
import {error, info} from '../utils/log'
import {pushQMsg} from '../providers/bot'
import getCheckinDetail from '../requests/getCheckinDetail'
import config from '../providers/config'
import accountsManager from '../utils/accountsManager'
import getRandomIntInclusive from '../utils/getRandomIntInclusive'

export default async (aid: number, courseName: string, courseId: number, cookie: string) => {
    const checkinInfo = await getCheckinDetail(cookie, aid)
    const sleepTime = getRandomIntInclusive(20, 35)
    info('收到', checkinInfo.type, '类型签到，延迟时间', sleepTime, '秒')
    pushQMsg(`收到 ${courseName} 的签到\n类型：${checkinInfo.type}\n将在 ${sleepTime} 秒后自动签到`)
    if (checkinInfo.type !== 'qr') {
        setTimeout(async () => {
            let res = ''
            try {
                // 将会附加到最终 QQ 群里推送的提示消息中
                for (const account of config.accounts) {
                    const accountMeta = await accountsManager.getAccountData(account.username)
                    res += '\n' + accountMeta.name + '：'
                    info('开始签到', account.username)
                    let ret = ''
                    if (checkinInfo.type === 'location')
                        ret = await handleGeoCheckin(aid, courseId, accountMeta)
                    else
                        ret = await handlerSimpleCheckin(aid, accountMeta)
                    res += ret
                    info('签到结束', account.username, ret)
                }
                pushQMsg(`自动签到：${res}`)
            } catch (e) {
                error('签到失败', aid, e)
                pushQMsg(`自动签到抛错：\n${e}\n\n部分返回信息：${res}`)
            }
        }, sleepTime * 1000)
    }
    else {
        info('收到二维码签到')
        pushQMsg(`收到 ${courseName} 的二维码签到，aid 为 ${aid}，需要提供一张二维码`)
    }
}
