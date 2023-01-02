const tencentcloud = require("tencentcloud-sdk-nodejs");
const OcrClient = tencentcloud.ocr.v20181119.Client;
import config from '../providers/config'

export default (buf: Buffer) => new Promise<string>(async (resolve, reject) => {
    const client = new OcrClient({
      credential: {
        secretId: config.ocr.secretId,
        secretKey: config.ocr.secretKey
      },
      region: "ap-shanghai",
      profile: {
        httpProfile: {
          endpoint: "ocr.tencentcloudapi.com",
        },
      },
    });
    client.QrcodeOCR({
      "Image": buf
    }).then(
      (data: any) => {
        resolve(data);
      }, (err: any) => {
        reject(err);
      }
    );
})
