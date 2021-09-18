import jimp from 'jimp'
import QrCode from 'qrcode-reader'

export default (buf: Buffer) => new Promise<string>(async (resolve, reject) => {
    const jimpImg = await jimp.read(buf)
    const qrcode = new QrCode()
    qrcode.callback = (err, value) => {
        if (err) {
            reject(err)
        }
        else {
            resolve(value.result)
        }
    }
    qrcode.decode(jimpImg.bitmap)
})
