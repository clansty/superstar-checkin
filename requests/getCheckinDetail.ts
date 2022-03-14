import axios from 'axios'
import {MOBILE_AGENT} from '../constants'
import CheckinDetailRet from '../types/CheckinDetailRet'
import {error} from '../utils/log'
import CheckinInfo from '../types/CheckinInfo'

/**
 * 获取签到活动详情
 * @param cookie
 * @param activeId active ID
 */
export default async (cookie: string, activeId: number | string): Promise<CheckinInfo> => {
    const ret = await axios.get<CheckinDetailRet>('https://mobilelearn.chaoxing.com/v2/apis/active/getPPTActiveInfo', {
        headers: {
            Cookie: cookie,
            'User-Agent': MOBILE_AGENT,
        },
        params: {
            activeId,
        },
    })

    let location = null
    if (ret.data.result === 1) {
        let type: 'qr' | 'gesture' | 'location' | 'photo' | 'normal'
        switch (ret.data.data.otherId) {
            case 2:
                type = 'qr'
                break
            case 3:
                type = 'gesture'
                break
            case 4:
                type = 'location'
                if (ret.data.data.ifopenAddress) {
                    // 是指定位置的签到
                    location = {
                        address: ret.data.data.locationText,
                        lat: ret.data.data.locationLatitude,
                        lon: ret.data.data.locationLongitude,
                        range: ret.data.data.locationRange,
                    };
                }
                break
            default:
                type = ret.data.data.ifphoto ? 'photo' : 'normal'
        }

        return {
            type, location
        }
    }
    const err = '查询签到详情时遇到问题，activeId: ' + activeId
    error(err)
    throw new Error(err)
}
