import {genGeoCheckinParams} from '../utils/genCheckinParams'
import checkin from '../requests/checkin'
import config from '../providers/config'
import AccountMetaData from '../types/AccountMetaData'
import handlerSimpleCheckin from './handleSimpleCheckin'

export default async (activeId: string | number, courseId: number, account: AccountMetaData) => {
    const geoInfo = config.geoLocations.find(e => e.courseId === courseId)
    let params

    if (geoInfo) {
        params = genGeoCheckinParams({
            uid: account.uid,
            name: account.name,
            activeId,
            latitude: geoInfo.lat,
            longitude: geoInfo.lon,
            address: geoInfo.address,
        })
        return await checkin(account.cookie, params)
    }
    else {
        console.warn(`课程 ID ${courseId} 没有设置位置信息，将不提交位置信息`)
        return (await handlerSimpleCheckin(activeId, account)) + `\n警告：课程 ID ${courseId} 没有设置位置信息，将不提交位置信息`
    }
}
