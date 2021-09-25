import {Sendable} from 'oicq'
import {bot} from '../providers/bot'
import config from '../providers/config'

export default async (message: Sendable) => {
    await bot.sendGroupMsg(config.bot.group, message)
}
