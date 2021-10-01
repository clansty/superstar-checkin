import ImMessageCheckin from '../types/ImMessageCheckin'
import {error, info, success, warn} from '../utils/log'
import getCheckinDetail from '../requests/getCheckinDetail'
import * as db from '../providers/db'
import handlerSimpleCheckin from './handlerSimpleCheckin'
import pushQMsg from '../utils/pushQMsg'
import config from '../providers/config'

export default async (message: ImMessageCheckin) => {
    try {
        if (!message.ext.attachment) return
        if (message.ext.attachment.attachmentType !== 15) {
            //不是签到信息
            return
        }
        const aid = message.ext.attachment.att_chat_course.aid
        const courseName = message.ext.attachment.att_chat_course.courseInfo.coursename
        const courseId = Number(message.ext.attachment.att_chat_course.courseInfo.courseid)
        if (config.ignoreLessons.includes(courseId)) return
        if (!aid) {
            warn('处理 IM 消息时出现异常，找不到 aid')
            return
        }
        switch (message.ext.attachment.att_chat_course.atype) {
            case 2:
                const checkinInfo = await getCheckinDetail(await db.getMeta<string>('cookie'), aid)
                info('收到', checkinInfo.type, '类型签到')
                let mts = `收到 ${courseName} 的签到\n类型：${checkinInfo.type}`
                if (checkinInfo.type !== 'qr') {
                    try {
                        const res = await handlerSimpleCheckin(aid)
                        mts += `\n自动签到：${res}`
                        if (res === 'success') {
                            success('签到成功', aid)
                        }
                        else
                            warn('签到失败', aid, res)
                    } catch (e) {
                        error('签到失败', aid, e)
                        mts += `\n自动签到：抛错\n${e}`
                    }
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
