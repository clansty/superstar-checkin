export default interface UserInfoRet {
    msg: Msg;
    result: number;
}

interface Msg {
    fid: number;
    rosterrights: number;
    codeInfos: CodeInfos;
    boundaccount: number;
    loginId: number;
    codeInfo: object;
    invitecode: string;
    pic: string;
    source: string;
    type: number;
    ranknum: string;
    isCertify: number;
    uname: string;
    copyRight: number;
    unitConfig: object;
    schoolname: string;
    unitConfigInfo: UnitConfigInfo;
    unitConfigInfos: UnitConfigInfos[];
    phone: string;
    bindFanya: boolean;
    updateWay: string;
    name: string;
    fullpinyin: string;
    status: number;
    roleid: string;
    industry: number;
    nick: string;
    uid: number;
    acttime2: string;
    dxfid: string;
    puid: number;
    rights: number;
    needIntruction: number;
    bindOpac: boolean;
    ppfid: string;
    accountInfo: AccountInfo;
    openid4fid: number;
    simplepinyin: string;
    sex: number;
    isNewUser: number;
    studentcode: string;
    inputfid: number;
    maintype: number;
}

interface AccountInfo {
    cx_opac: CxOpac;
    imAccount: ImAccount;
    cx_fanya: CxFanya;
}

interface CxFanya {
    loginId: number;
    openid5: string;
    roleid: string;
    countrycode: string;
    industry: number;
    result: boolean;
    uid: number;
    dxfid: number;
    loginUrl: string;
    nickname: string;
    openid2: string;
    openid1: string;
    lastuname: string;
    openid4: string;
    lastfid: number;
    openid3: string;
    isCertify: number;
    createDate: string;
    lastLogon: string;
    lastschoolname: string;
    uname: string;
    copyRight: number;
    sex: number;
    tippwd: string;
    schoolname: string;
    realname: string;
    studentcode: string;
    tiptitle: string;
    phone: string;
    schoolid: number;
    time: number;
    boundUrl: string;
    tipuname: string;
    cxid: number;
    status: number;
}

interface ImAccount {
    uid: number;
    password: string;
    created: number;
    modified: number;
    type: string;
    uuid: string;
    activated: number;
    username: string;
}

interface CxOpac {
    showName: string;
    loginId: number;
    uname: string;
    tippwd: string;
    userid: number;
    result: number;
    uid: string;
    tiptitle: string;
    phone: string;
    loginUrl: string;
    schoolId: number;
    displayname: string;
    boundUrl: string;
    schoolName: string;
    department: string;
    tipuname: string;
    email: string;
    unableEditInfo: UnableEditInfo;
}

interface UnableEditInfo {
    phone: number;
    displayname: number;
    department: number;
    email: number;
}

interface UnitConfigInfos {
    fid: number;
    hpConfig: HpConfig;
    uname: string;
    webCourseUrl: string;
}

interface HpConfig {
    showBaseHp: number;
    showMicroServiceHp: number;
}

interface UnitConfigInfo {
    hpConfig: HpConfig;
    webCourseUrl: string;
}

interface CodeInfos {
    homeConfig: HomeConfig;
}

interface HomeConfig {
    dwcode: string;
    fid: number;
    canDel: number;
    dwtype: number;
    isshowcode: number;
    toolbarMode: number;
    hometype: number;
    sort: number;
    source: number;
    joinunit: number;
    rid: number;
    weburl: string;
    displayname: string;
    id: number;
}

