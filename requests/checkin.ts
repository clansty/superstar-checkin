import axios from 'axios'
import {MOBILE_AGENT} from '../constants'

export default async function checkin(cookie: string, params: { activeId: string } & any): Promise<string> {
    await axios.get('https://mobilelearn.chaoxing.com/newsign/preSign', {
        headers: {
            Cookie: cookie,
            'User-Agent': MOBILE_AGENT,
        },
        params: {
            activePrimaryId: params.activeId,
            general: 1,
            sys: 1,
            ls: 1,
            appType: 15,
            ut: 's',
        },
    })
    return (await axios.get('https://mobilelearn.chaoxing.com/pptSign/stuSignajax', {
        headers: {
            Cookie: cookie,
            'User-Agent': MOBILE_AGENT,
        },
        params,
    })).data
}
