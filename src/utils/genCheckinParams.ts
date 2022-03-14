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

export const genSimpleCheckinParams = (params: {
    activeId: string | number,
    uid: string | number,
    name: string,
}) => ({
    ...params,
    clientip: '',
    useragent: '',
    latitude: -1,
    longitude: -1,
    fid: 200,
    appType: 15,
})

// 位置签到
export const genGeoCheckinParams = (params: {
    activeId: string | number,
    uid: string | number,
    name: string,
    latitude: number,
    longitude: number,
    address: string
}) => ({
    ...params,
    clientip: '',
    useragent: '',
    fid: 200,
    appType: 15,
    ifTiJiao: 1
})
