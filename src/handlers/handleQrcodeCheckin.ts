import * as db from '../providers/db'
import {genQrcodeCheckinParams} from '../utils/genCheckinParams'
import checkin from '../requests/checkin'
import AccountMetaData from '../types/AccountMetaData'

export default async (activeId: string, enc: string, account: AccountMetaData) => {
    const params = genQrcodeCheckinParams({
        uid: account.uid,
        name: account.name,
        activeId, enc,
    })
    return await checkin(account.cookie, params)
}
