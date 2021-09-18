import axios from 'axios'
import {MOBILE_AGENT} from '../constants'

export default async function checkin(cookie: string, params: object): Promise<string> {
    return (await axios.get('https://mobilelearn.chaoxing.com/pptSign/stuSignajax', {
        headers: {
            Cookie: cookie,
            'User-Agent': MOBILE_AGENT,
        },
        params,
    })).data
}
