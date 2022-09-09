import fs from 'fs/promises'
import fsOrigin from 'fs'

let meta: Record<string, any> = {}

const jsonFile = process.env.DATA_DIR ? process.env.DATA_DIR + '/superstar-data.json' : './data/superstar-data.json'

export const connect = async () => {
    try {
        // 按道理可以改成同步的，但是懒得手动返回 Promise 了
        const metaStream = await fs.readFile(jsonFile)
        const metaStr = metaStream.toString()
        meta = JSON.parse(metaStr)
    } catch (error) {
    } // 试图读取数据，没有数据就当无事发生
}

export const getMeta = async <T>(name: string) => {
    const data = meta[name]
    return data ? (data as T) : null
}

export const setMeta = async <T>(name: string, value: T) => {
    meta[name] = value
    await fs.writeFile(
        jsonFile,
        JSON.stringify(meta, null, 2),
    )
}

process.on('SIGINT', () => {
    fsOrigin.writeFileSync(
        jsonFile,
        JSON.stringify(meta, null, 2),
    )
    process.exit(0)
})
