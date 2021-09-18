import {createClient} from 'oicq'
import config from './config'

export const bot = createClient(config.bot.uin)

export const loginBot = () => new Promise(resolve => {
    bot.once('system.online', resolve)
    bot.login(config.bot.password)
})
