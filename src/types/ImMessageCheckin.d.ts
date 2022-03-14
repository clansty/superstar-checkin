export default interface ImMessageCheckin {
    id: string;
    type: string;
    contentsType: string;
    from: string;
    to: string;
    data: string;
    ext: Ext;
    sourceMsg: string;
    time: string;
    msgConfig: object;
    error: boolean;
    errorText: string;
    errorCode: number;
}

interface Ext {
    openChatView: boolean;
    extraInfo: ExtraInfo;
    chatid: string;
    attachment: Attachment;
}

interface Attachment {
    att_chat_course: AttChatCourse;
    attachmentType: number;
}

interface AttChatCourse {
    aid: number;
    atype: number;
    atypeName: string;
    courseInfo: CourseInfo;
    logo: string;
    msgStatus: number;
    pcUrl: string;
    subTitle: string;
    title: string;
    toolbarType: number;
    type: number;
    url: string;
}

interface CourseInfo {
    bbsid: string;
    classid: number;
    courseid: string;
    coursename: string;
    imageUrl: string;
    isthirdaq: string;
    teacherfactor: string;
}

interface ExtraInfo {
    status: number;
}

