export default interface GeoLocation {
    courseId: number
    lat: number,
    lon: number,
    address: string
    onlyOnWeekdays?: Array<number>
}
