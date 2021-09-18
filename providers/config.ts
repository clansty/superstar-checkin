import * as fs from 'fs'
import YAML from 'yaml'

interface Config {
    username: string
    password: string
    mongodb: string
    dbName: string
    bot: {
        uin: number
        password: string,
        group: number
    }
}

export default YAML.parse(fs.readFileSync('config.yaml', 'utf-8')) as Config
