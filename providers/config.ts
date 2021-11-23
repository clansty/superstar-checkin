import * as fs from "fs";
import YAML from "yaml";
import Account from '../types/Account'

interface Config {
  bot: {
    uin: number | 'disabled';
    password: string;
    notifyGroups: number[];
    qrcodeGroups: number[];
    ignore?: number[];
  };
  ignoreCourses: number[];
  geoLocations: Array<{
    courseId: number
    lat: number,
    lon: number,
    address: string
  }>
  accounts: Array<Account>
}

export default YAML.parse(fs.readFileSync("config.yaml", "utf-8")) as Config;
