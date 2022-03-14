import GeoLocation from './GeoLocation'

type CheckinType = 'qr' | 'gesture' | 'location' | 'photo' | 'normal'

export default interface CheckinInfo {
    type: CheckinType
    location?: GeoLocation & { range: string }
}
