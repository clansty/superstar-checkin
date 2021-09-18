import fs from "fs/promises";
import fsOrigin from "fs";

let meta: Record<string, any> = {};
let thisDbName: string;

export const connect = async (dbName: string) => {
  thisDbName = dbName;
  try {
    // 按道理可以改成同步的，但是懒得手动返回 Promise 了
    const metaStream = await fs.readFile(
      `./build/data/data-${thisDbName}.json`
    );
    const metaStr = metaStream.toString();
    meta = JSON.parse(metaStr);
  } catch (error) {} // 试图读取数据，没有数据就当无事发生
};

export const getMeta = async <T>(name: string) => {
  const data = meta[name];
  return data ? (data as T) : null;
};

export const setMeta = async <T>(name: string, value: T) => {
  meta[name] = value;
};

process.on("SIGINT", () => {
  fsOrigin.writeFileSync(
    `./build/data/data-${thisDbName}.json`,
    JSON.stringify(meta, null, 2)
  );
  process.exit(0);
});
