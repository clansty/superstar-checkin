import axios from 'axios'
import UserInfoRet from '../types/UserInfoRet'
import {PC_AGENT} from '../constants'
import {error} from '../utils/log'

export default async (cookie: string)=>{
    const res=await axios.get<UserInfoRet>('https://sso.chaoxing.com/apis/login/userLogin4Uname.do',{
        headers: {
            Cookie: cookie,
            "User-Agent": PC_AGENT,
        },
    })

    if(res.data.result===1)
        return res.data.msg

    const errMsg='获取用户信息失败，错误码 '+res.data.result
    error(errMsg)
    throw new Error(errMsg)
}
