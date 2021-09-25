import axios from 'axios'
import {PC_AGENT} from '../constants'
import cheerio from 'cheerio'

/**
 * 获取连接学习通 easemob 即时通信的 token
 * @param cookie
 */
export default async (cookie: string) => {
    const res = await axios.get<string>('https://im.chaoxing.com/webim/me', {
        headers: {
            Cookie: cookie,
            'User-Agent': PC_AGENT,
        },
        responseType: 'text',
    })
    const $ = cheerio.load(res.data)
    return $('#myToken').text()
}
