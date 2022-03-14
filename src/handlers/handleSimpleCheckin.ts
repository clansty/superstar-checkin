import {genSimpleCheckinParams} from '../utils/genCheckinParams'
import checkin from '../requests/checkin'
import AccountMetaData from '../types/AccountMetaData'

export default async (activeId: string | number, account: AccountMetaData) => {
    const params = genSimpleCheckinParams({
        uid: account.uid,
        name: account.name,
        activeId,
    })
    return await checkin(account.cookie, params)
}
