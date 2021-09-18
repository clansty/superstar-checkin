import {Collection, Db, MongoClient} from 'mongodb'

let db: Db
let meta: Collection<{ name: string, value: any }>

export const connect = async (connStr: string, dbName: string) => {
    const dba = await MongoClient.connect(connStr)
    db = dba.db(dbName)
    meta = db.collection('meta')
    await meta.createIndex('name', {
        unique: true,
    })
}

export const getMeta = async <T>(name: string) => {
    const record = await meta.findOne({name})
    if (record)
        return record.value as T
    return null
}

export const setMeta = async <T>(name: string, value: T) => {
    await meta.updateOne({name}, {$set: {value}}, {upsert: true})
}
