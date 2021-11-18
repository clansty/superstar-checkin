import {Client, createClient, Sendable} from 'oicq'
import config from './config'
import attachGroupMessageHandler from '../handlers/attachGroupMessageHandler'

let bot: Client

export const loginBot = () => new Promise<any>(resolve => {
  if (config.bot.uin === 'disabled') return resolve(0)
  bot = createClient(config.bot.uin, {
    brief: true,
    log_level: 'warn',
  })
  bot.once('system.online', resolve)
  bot.login(config.bot.password)
  //机器人接收二维码和解码签到事件
  attachGroupMessageHandler(bot)
})

export const pushQMsg = async (message: Sendable) => {
  if (config.bot.uin === 'disabled') return
  for (const group of config.bot.notifyGroups) {
    await bot.sendGroupMsg(group, message)
  }
}
