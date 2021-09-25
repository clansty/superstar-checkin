import * as db from '../providers/db'
import {genSimpleCheckinParams} from '../utils/genCheckinParams'
import checkin from '../requests/checkin'

export default async (activeId: string | number) => {
    const cookie = await db.getMeta<string>('cookie')
    const name = await db.getMeta<string>('name')
    const uid = await db.getMeta<number>('uid')

    const params = genSimpleCheckinParams({uid, name, activeId})
    return await checkin(cookie, params)
}
