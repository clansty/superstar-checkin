const tencentcloud = require("tencentcloud-sdk-nodejs");
const OcrClient = tencentcloud.ocr.v20181119.Client;
import config from '../providers/config'

export default (url: string) => new Promise<string>(async (resolve, reject) => {
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
      "ImageUrl": url
    }).then(
      (data: any) => {
        resolve(data.CodeResults[0].Url);
      }, (err: any) => {
        reject(err);
      }
    );
})
