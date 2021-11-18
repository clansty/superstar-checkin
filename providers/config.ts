import * as fs from "fs";
import YAML from "yaml";

interface Config {
  username: string;
  password: string;
  bot: {
    uin: number;
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
}

export default YAML.parse(fs.readFileSync("config.yaml", "utf-8")) as Config;
