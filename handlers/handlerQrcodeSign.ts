import * as db from '../providers/db'
import {genQrcodeCheckinParams} from '../utils/genCheckinParams'
import checkin from '../requests/checkin'

export default async (activeId: string, enc: string) => {
    const cookie = await db.getMeta<string>('cookie')
    const name = await db.getMeta<string>('name')
    const uid = await db.getMeta<number>('uid')

    const params = genQrcodeCheckinParams({uid, name, activeId, enc})
    return await checkin(cookie, params)
}
