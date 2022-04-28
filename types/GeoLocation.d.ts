export default interface GeoLocation {
    courseId: number | string,
    lat: number,
    lon: number,
    address: string
    onlyOnWeekdays?: Array<number>
}
