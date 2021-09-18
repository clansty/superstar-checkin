import * as fs from 'fs'
import YAML from 'yaml'

interface Config{
    username: string
    password: string
}

export default YAML.parse(fs.readFileSync('config.yaml', 'utf-8')) as Config
