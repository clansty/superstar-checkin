import {Client, ImageElem} from 'oicq'
import config from '../providers/config'
import {info} from '../utils/log'
import axios from 'axios'
import decodeQrCode from '../utils/decodeQrCode'
import handlerQrcodeSign from './handlerQrcodeSign'

export default (bot: Client) => bot.on('message.group', async data => {
    //检查来源
    if (!config.bot.qrcodeGroups.includes(data.group_id)) return
    //检查屏蔽名单，防止两个机器人一台戏
    if (config.bot.ignore && config.bot.ignore.includes(data.user_id)) return
    //处理 ping 请求
    if (data.raw_message === 'ping') {
        data.reply('pong!')
        return
    }
    //检查图片
    const imageElem = data.message.find(e => e.type === 'image') as ImageElem
    if (!imageElem) return info('不是图片')
    //获取图片，识别二维码
    const buf = (await axios.get<Buffer>(imageElem.url, {
        responseType: 'arraybuffer',
    })).data
    try {
        const dec = await decodeQrCode(buf)
        let message = '二维码解码：\n' + dec + '\n'
        //解析签到参数
        const REGEX_ENC = /SIGNIN:.*aid=(\d+)&.*&enc=([\dA-F]+)/
        if (REGEX_ENC.test(dec)) {
            const exec = REGEX_ENC.exec(dec)
            message += `aid: ${exec[1]}\nenc: ${exec[2]}\n正在执行签到...`
            data.reply(message)
            const ret = await handlerQrcodeSign(exec[1], exec[2])
            data.reply(ret)
        }
        else
            data.reply(message)
    } catch (e) {
        data.reply(`二维码解码失败：${e}`)
    }
})
