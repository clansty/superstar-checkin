//提供学习通即时通信协议

import jsdom from 'jsdom'

const {JSDOM} = jsdom //在jsdom中导出JSDOM对象
const {window} = new JSDOM('<!doctype html><html><body></body></html>', {url: 'https://im.chaoxing.com/webim/me'}); //导出JSDOM中的window对象
(global as any).window = window; //将window对象设置为nodejs中全局对象;
(global as any).navigator = window.navigator;
(global as any).location = window.location;
(global as any).document = window.document;
(global as any).WebSocket = window.WebSocket
import '../sdk/Easemob-chat-3.6.3'
import {info, success, warn} from '../utils/log'
import getImToken from '../requests/getImToken'
import handleEasemobMessage from '../handlers/handleEasemobMessage'
import sleep from '../utils/sleep'

// 登录环信所用的帐号信息的缓存
const account = {
    cookie: '',
    uid: 0,
}

window.WebIM.config = {
    xmppURL: 'https://im-api-vip6-v2.easecdn.com/ws',
    apiURL: 'https://a1-vip6.easecdn.com',
    appkey: 'cx-dev#cxstudy',
    Host: 'easemob.com',
    https: true,
    isHttpDNS: false,
    isMultiLoginSessions: true,
    isAutoLogin: true,
    isWindowSDK: false,
    isSandBox: false,
    isDebug: false,
    autoReconnectNumMax: Number.POSITIVE_INFINITY,
    autoReconnectInterval: 2,
    isWebRTC: true,
    heartBeatWait: 2000,
    delivery: false,
}
window.WebIM.conn = new window.WebIM.connection({
    appKey: window.WebIM.config.appkey,
    isHttpDNS: window.WebIM.config.isHttpDNS,
    isMultiLoginSessions: window.WebIM.config.isMultiLoginSessions,
    host: window.WebIM.config.Host,
    https: window.WebIM.config.https,
    url: window.WebIM.config.xmppURL,
    apiUrl: window.WebIM.config.apiURL,
    isAutoLogin: false,
    heartBeatWait: window.WebIM.config.heartBeatWait,
    autoReconnectNumMax: window.WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: window.WebIM.config.autoReconnectInterval,
    isStropheLog: window.WebIM.config.isStropheLog,
    delivery: window.WebIM.config.delivery,
    isDebug: window.WebIM.config.isDebug,
})

window.WebIM.conn.listen({
    onOpened: function (message) {
        success('IM 协议连接成功')
    },
    onClosed: function (message) {
        warn('IM 协议连接关闭')
    },
    onTextMessage: function (message) {
        info('IM 协议收到文本消息', JSON.stringify(message))
        handleEasemobMessage(message, account.cookie)
    },
    onEmojiMessage: function (message) {
    },
    onPictureMessage: function (message) {
    },
    onCmdMessage: function (message) {
    },
    onAudioMessage: function (message) {
    },
    onLocationMessage: function (message) {
    },
    onFileMessage: function (message) {
    },
    onVideoMessage: function (message) {
    },
    onPresence: function (message) {
    },
    onRoster: function (message) {
    },
    onInviteMessage: function (message) {
    },
    onOnline: function () {
    },
    onOffline: function () {
        warn('IM 下线')
    },
    onError: async function (message) {
        warn('IM 协议错误', message)
        if (message.type === 40) {
            window.WebIM.conn.close()
            warn('IM 协议身份验证失败，重新获取 token')
            await sleep(2000)
            imConnect(account.cookie, account.uid)
        }
    },
    onBlacklistUpdate: function (list) {
    },
})

const connect = (user: string | number, accessToken: string) => {
    const options = {
        apiUrl: 'https://a1-vip6.easecdn.com',
        user,
        accessToken,
        appKey: 'cx-dev#cxstudy',
    }
    window.WebIM.conn.open(options)
}

export const imConnect = async (cookie: string, uid: number) => {
    account.cookie = cookie
    account.uid = uid
    const imToken = await getImToken(cookie)
    connect(uid, imToken)
}
