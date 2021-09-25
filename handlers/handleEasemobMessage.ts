import ImMessageCheckin from '../types/ImMessageCheckin'
import {error, info, success, warn} from '../utils/log'
import getCheckinDetail from '../requests/getCheckinDetail'
import * as db from '../providers/db'
import handlerSimpleCheckin from './handlerSimpleCheckin'

export default async (message: ImMessageCheckin) => {
    try {
        if (!message.ext.attachment) return
        if (message.ext.attachment.attachmentType !== 15) {
            //不是签到信息
            return
        }
        const aid = message.ext.attachment.att_chat_course.aid
        if (!aid) {
            warn('处理 IM 消息时出现异常，找不到 aid')
            return
        }
        const checkinInfo = await getCheckinDetail(await db.getMeta<string>('cookie'), aid)
        info('收到', checkinInfo.type, '类型签到')
        if (checkinInfo.type !== 'qr') {
            const res = await handlerSimpleCheckin(aid)
            if (res === 'success')
                success('签到成功', aid)
            else
                warn('签到失败', aid, res)
        }
    } catch (e) {
        error('处理 IM 消息时出现异常，可能不是活动消息', e)
    }
}
