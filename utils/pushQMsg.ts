import {Sendable} from 'oicq'
import {bot} from '../providers/bot'
import config from '../providers/config'

export default async (message: Sendable) => {
    for (const group of config.bot.notifyGroups) {
        await bot.sendGroupMsg(group, message)
    }
}
