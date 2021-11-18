import * as db from '../providers/db'
import { genGeoCheckinParams, genSimpleCheckinParams } from '../utils/genCheckinParams'
import checkin from '../requests/checkin'
import config from '../providers/config'

export default async (activeId: string | number, courseId: number) => {
    const cookie = await db.getMeta<string>('cookie')
    const name = await db.getMeta<string>('name')
    const uid = await db.getMeta<number>('uid')

    const geoInfo = config.geoLocations.find(e => e.courseId === courseId)
    let params

    if (geoInfo)
        params = genGeoCheckinParams({
            uid, name, activeId,
            latitude: geoInfo.lat,
            longitude: geoInfo.lon,
            address: geoInfo.address
        })
    else
        params = genSimpleCheckinParams({ uid, activeId, name })
    return await checkin(cookie, params)
}
