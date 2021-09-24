import config from "./providers/config";
import validateCookie from "./requests/validateCookie";
import { info, warn } from "./utils/log";
import * as db from "./providers/db";
import { bot, loginBot } from "./providers/bot";
import loginAndSaveInfo from "./utils/loginAndSaveInfo";
import axios from "axios";
import attachGroupMessageHandler from "./handlers/attachGroupMessageHandler";
import jsdom from 'jsdom'
const {JSDOM } = jsdom; //在jsdom中导出JSDOM对象
const { window } = new JSDOM('<!doctype html><html><body></body></html>',{url: 'https://a1-vip6.easecdn.com'}); //导出JSDOM中的window对象
(global as any).window = window; //将window对象设置为nodejs中全局对象;
(global as any).navigator = window.navigator;
(global as any).location = window.location;
(global as any).document = window.document;
import websdk from 'easemob-websdk'


(async () => {
  const conn = new websdk.connection({
    "xmppURL": "https://im-api-vip6-v2.easecdn.com/ws",
    "apiURL": "https://a1-vip6.easecdn.com",
    "appkey": "cx-dev#cxstudy",
    "Host": "easemob.com",
    "https": true,
    "isHttpDNS": false,
    "isMultiLoginSessions": true,
    "isAutoLogin": true,
    "isWindowSDK": false,
    "isSandBox": false,
    "isDebug": false,
    "autoReconnectNumMax": 2,
    "autoReconnectInterval": 2,
    "isWebRTC": true,
    "heartBeatWait": 4500,
    "delivery": false
  })
  const options = {
    apiUrl : "https://a1-vip6.easecdn.com",
    user : '',
    accessToken : '',
    appKey : 'cx-dev#cxstudy'
  };
  conn.open(options);

  conn.listen({
    onOpened : function(message) { // 连接成功回调
      // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
      // 手动上线指的是调用conn.setPresence();
      // 如果conn初始化时已将isAutoLogin设置为true
      // 则无需调用conn.setPresence();
      console.log('成功', message);
    },
    onClosed : function(message) {
      console.log(message)
    }, // 连接关闭回调handleTextMessage
    onTextMessage : function(message) {
        console.log('收到文本消息--', message);
    }, // 收到文本消息
    onEmojiMessage : function(message) {
        console.log('收到表情消息--', message);
    }, // 收到表情消息
    onPictureMessage : function(message) {
        console.log('收到图片消息--', message);
    }, // 收到图片消息
    onCmdMessage : function(message) {
        console.log('收到命令消息--', message);
    }, // 收到命令消息
    onAudioMessage : function(message) {
        console.log('收到音频消息--', message);
    }, // 收到音频消息
    onLocationMessage : function(message) {
      console.log('收到位置消息--', message);
    },// 收到位置消息
    onFileMessage : function(message) {
      console.log('接收到文件--', message);
    }, // 收到文件消息
    onVideoMessage : function(message) {
      console.log('收到视频消息--', message);
      var node = document.getElementById('privateVideo');
      var option = {
        url : message.url,
        headers : {
          'Accept' : 'audio/mp4'
        },
        onFileDownloadComplete : function(response) {
        },
        onFileDownloadError : function() {
          console.log('File down load error.');
        }
      };
    }, // 收到视频消息
    onPresence : function(message) {
        console.log('收到联系人订阅请求、处理群组、聊天室被踢解散等消息',message);
    }, // 收到联系人订阅请求、处理群组、聊天室被踢解散等消息
    onRoster : function(message) {
      console.log(message);
    }, // 处理好友申请
    onInviteMessage : function(message) {
        console.log('处理群组邀请',message);
    }, // 处理群组邀请
    onOnline : function() {
      //loginByToken(evenName, evenToken);
    }, // 本机网络连接成功
    onOffline : function() {
      //loginByToken(evenName, evenToken);
    }, // 本机网络掉线
    onError : function(message) {
      //loginByToken(evenName, evenToken);
      console.log('连接失败', message);
      throw new Error()
    }, // 失败回调
    onBlacklistUpdate : function(list) { // 黑名单变动
      // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
      console.log(list);
    }
  });

  return


  //初始化数据库连接和 bot
  axios.defaults.proxy = false;
  await db.connect(config.dbName);
  await loginBot();
  console.info("系统初始化完毕");
  //验证及获取 cookie
  let isCookieValid = false;
  let cookie = await db.getMeta<string>("cookie");
  if (cookie) {
    isCookieValid = await validateCookie(cookie);
    if (isCookieValid) info("Cookie 有效");
    else warn("Cookie 无效");
  }
  if (!isCookieValid) {
    cookie = await loginAndSaveInfo();
  }
  //登录步骤完成
  const schoolname = await db.getMeta<string>("schoolname");
  const name = await db.getMeta<string>("name");
  info(`欢迎来自 ${schoolname} 的 ${name}`);
  //机器人接收二维码和解码签到事件
  attachGroupMessageHandler(bot);
})();
