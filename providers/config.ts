import * as fs from 'fs'
import YAML from 'yaml'
import Account from '../types/Account'
import GeoLocation from '../types/GeoLocation'

interface Config {
    bot: {
        uin: number | 'disabled';
        qrlogin: boolean;
        password: string;
        notifyGroups: number[];
        qrcodeGroups: number[];
        ignore?: number[];
        platform?: number;
    };
    ocr: {
        secretId: number;
        secretKey: number;
    }
    ignoreCourses: number[];
    geoLocations: Array<GeoLocation>
    accounts: Array<Account>
}

export default YAML.parse(fs.readFileSync(process.env.CONFIG_FILE || 'config.yaml', 'utf-8')) as Config
