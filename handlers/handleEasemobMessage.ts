import ImMessageCheckin from '../types/ImMessageCheckin'
import {error, info, success, warn} from '../utils/log'
import getCheckinDetail from '../requests/getCheckinDetail'
import * as db from '../providers/db'
import handlerSimpleCheckin from './handlerSimpleCheckin'
import {pushQMsg, pushQMsgToFirstGroup} from '../providers/bot'
import config from '../providers/config'
import handleGeoCheckin from './handleGeoCheckin'

export default async (message: ImMessageCheckin) => {
    try {
        if (message.data === 'test') {
            pushQMsgToFirstGroup('测试成功，WebSocket 在线')
        }
        if (!message.ext.attachment) return
        if (message.ext.attachment.attachmentType !== 15) {
            //不是签到信息
            return
        }
        const aid = message.ext.attachment.att_chat_course.aid
        const courseName = message.ext.attachment.att_chat_course.courseInfo.coursename
        const courseId = Number(message.ext.attachment.att_chat_course.courseInfo.courseid)
        if (config.ignoreCourses.includes(courseId)) return
        if (!aid) {
            warn('处理 IM 消息时出现异常，找不到 aid')
            return
        }
        switch (message.ext.attachment.att_chat_course.atype) {
            case 0:
                // 可能是签到
                if (!isSignActivity(message)) return
            case 2:
                const checkinInfo = await getCheckinDetail(await db.getMeta<string>('cookie'), aid)
                info('收到', checkinInfo.type, '类型签到')
                let mts = `收到 ${courseName} 的签到\n类型：${checkinInfo.type}`
                if (checkinInfo.type !== 'qr') {
                    setTimeout(async () => {
                        try {
                            let res
                            if (checkinInfo.type === 'location')
                                res = await handleGeoCheckin(aid, courseId)
                            else
                                res = await handlerSimpleCheckin(aid)
                            if (res === 'success') {
                                success('签到成功', aid)
                            }
                            else {
                                warn('签到失败', aid, res)
                                pushQMsg(`自动签到：${res}`)
                            }
                        } catch (e) {
                            error('签到失败', aid, e)
                            pushQMsg(`自动签到：抛错\n${e}`)
                        }
                    }, 30 * 1000)
                }
                else {
                    info('收到二维码签到')
                    mts = `收到 ${courseName} 的二维码签到，需要提供一张二维码`
                }
                pushQMsg(mts)
                break
            default:
                const activityName = message.ext.attachment.att_chat_course.atypeName
                pushQMsg(`收到 ${courseName} 的 ${activityName} 类型活动`)
        }
    } catch (e) {
        error('处理 IM 消息时出现异常，可能不是活动消息', e)
    }
}

// 用于判断一个 atype=0 的消息是不是变相的签到消息
const isSignActivity = (atype0Activity: ImMessageCheckin) => {
    if (atype0Activity.ext.attachment.att_chat_course.pcUrl.toLowerCase().includes('sign')) {
        return true
    }
    if (atype0Activity.ext.attachment.att_chat_course.pcUrl.toLowerCase().includes('checkin')) {
        return true
    }
    if (atype0Activity.ext.attachment.att_chat_course.url.toLowerCase().includes('sign')) {
        return true
    }
    if (atype0Activity.ext.attachment.att_chat_course.url.toLowerCase().includes('checkin')) {
        return true
    }
    if (atype0Activity.ext.attachment.att_chat_course.logo.toLowerCase().includes('qd3.png')) {
        return true
    }
    return atype0Activity.ext.attachment.att_chat_course.title.includes('签到')
}
