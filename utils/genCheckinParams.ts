type QrcodeCheckinParamsSrc = {
    //二维码解码
    enc: string,
    //姓名
    name: string,
    //活动 id
    activeId: string | number,
    uid: string | number,
}

export const genQrcodeCheckinParams = (params: QrcodeCheckinParamsSrc) => ({
    ...params,
    clientip: '',
    useragent: '',
    latitude: -1,
    longitude: -1,
    fid: 200,
    appType: 15,
})
