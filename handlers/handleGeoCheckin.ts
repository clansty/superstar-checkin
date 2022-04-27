import {genGeoCheckinParams} from '../utils/genCheckinParams'
import checkin from '../requests/checkin'
import config from '../providers/config'
import AccountMetaData from '../types/AccountMetaData'
import handlerSimpleCheckin from './handleSimpleCheckin'
import GeoLocation from '../types/GeoLocation'
import {warn} from "../utils/log";

const inferCourseGeoInfo = (geoLocations: Array<GeoLocation>, courseId: number) => {
    const weekDay = new Date().getDay()
    const locations = geoLocations.filter(e => e.courseId === courseId)
    for (const location of locations) {
        if (!location.onlyOnWeekdays)
            return location
        else if (location.onlyOnWeekdays && location.onlyOnWeekdays.includes(weekDay)) {
            return location
        }
    }
    // 使用 fallback 位置
    const fallback = geoLocations.find(e => e.courseId === "*")
    if (fallback) {
        warn(`课程 ID ${courseId} 没有设置位置信息，使用 fallback 位置`)
        return fallback
    }
}

export default async (activeId: string | number, courseId: number, account: AccountMetaData, geoInfo?: GeoLocation) => {
    if (!geoInfo) {
        geoInfo = inferCourseGeoInfo(config.geoLocations, courseId)
    }
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
    } else {
        console.warn(`课程 ID ${courseId} 没有设置位置信息，将不提交位置信息`)
        return (await handlerSimpleCheckin(activeId, account)) + `\n警告：课程 ID ${courseId} 没有设置位置信息，将不提交位置信息`
    }
}
