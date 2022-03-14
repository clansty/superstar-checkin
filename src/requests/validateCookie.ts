import {PC_AGENT} from '../constants'
import axios from 'axios'

export default async function validateCookie(cookie: string):Promise<boolean> {
    const response = await axios.get("http://i.mooc.chaoxing.com/space/", {
        headers: {
            Cookie: cookie,
            "User-Agent": PC_AGENT,
        },
        params: {
            rss: 1,
            catalogId: 0,
            start: 0,
            size: 500,
        },
        proxy: false
    });

    try {
        return !response.data.includes("用户登录");
    } catch (error) {
        console.error(error);
        return false;
    }
}
