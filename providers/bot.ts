import {Client, Sendable} from 'oicq'
import config from './config'
import attachGroupMessageHandler from '../handlers/attachGroupMessageHandler'

let bot: Client

export const loginBot = () => new Promise<any>(resolve => {
  if (config.bot.uin === 'disabled') return resolve(0)
  bot = new Client(config.bot.uin, {
    log_level: 'warn',
    data_dir: process.env.DATA_DIR,
    platform: config.bot.platform || 5,
  })
  bot.once('system.online', resolve)
  bot.login(config.bot.password)
  //机器人接收二维码和解码签到事件
  attachGroupMessageHandler(bot)
})

export const pushQMsg = async (message: Sendable) => {
  if (config.bot.uin === 'disabled') return
  for (const group of config.bot.notifyGroups) {
    await bot.pickGroup(group).sendMsg(message)
  }
}

export const pushQMsgToFirstGroup = async (message: Sendable) => {
  if (config.bot.uin === 'disabled') return
  await bot.pickGroup(config.bot.notifyGroups[0]).sendMsg(message)
}
