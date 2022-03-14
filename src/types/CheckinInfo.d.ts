type CheckinType = 'qr' | 'gesture' | 'location' | 'photo' | 'normal'

export default interface CheckinInfo {
    type: CheckinType
}
