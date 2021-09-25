import axios from 'axios'
import * as queryString from 'querystring'
import {PC_AGENT} from '../constants'
import {wrapper} from 'axios-cookiejar-support'
import {CookieJar} from 'tough-cookie'
import LoginReturn from '../types/LoginReturn'

const jar = new CookieJar()
const client = wrapper(axios.create({jar, proxy: false}))

export default async function login(account: string, password: string) {
    const response: LoginReturn = (await client.post(
        'https://passport2-api.chaoxing.com/v11/loginregister',
        queryString.stringify({
            uname: account,
            code: password,
        }),
        {
            headers: {
                'User-Agent': PC_AGENT,
            },
        },
    )).data

    if (response.status) {
        const cookies = jar.toJSON().cookies
        const uid = parseInt(cookies.find((cookie) => cookie.key === "UID").value);

        return {
            cookie: jar.getCookieStringSync("https://chaoxing.com"),
            uid: uid,
        }
    }
    else {
        throw new Error(response.mes)
    }
}
