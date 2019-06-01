
import { Collection, Db, MongoClient } from 'mongodb';
import { ICache } from '../types/cache';
import { escapeReg } from '../utils/func';

interface ISchema {
  key: string,
  value: string
}

/**
 * @class Mongodb
 * @classdesc Mongodb cache
 */
export default class Mongodb implements ICache {
  private client: MongoClient;
  private collection: Collection<ISchema>;
  private options: any;
  constructor(options: any) {
    this.options = options;
    // this.init.call(this, options);
    return this;
  }
  /**
   * @description mongodb close
   */
  public destory() {
    this.client.close();
  }
  /**
   * mongodb init, createCollection etc.
   * @param options constructor options
   */
  public async init(options = {} as any) {
    options = options || this.options;
    const url = options.url || 'mongodb://localhost:27017';
    // Database Name
    const dbName = 'ncache';
    const dbCollection = 'ncache';
    // Use connect method to connect to the server
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    await db.createCollection(dbCollection, { validator : { $and:
      [
        { key: { $type: 'string', $unique: true, $exists: true } },
        { value: { $type: 'string', $exists: true } }
      ]}
    });
    this.client = client;
    this.collection = db.collection(dbCollection);
    await this.collection.createIndex({ key: 1 }, { unique: true });
    return this;
  }
  /**
   * @description delete cache
   * @param key cache key
   */
  public async delete(key: string) {
    const keys: any = await this.collection.deleteOne({ key: this.cachePrefix(key)});
    const result = keys.toJSON()
    if (result) {
      return (result.ok) ? true : false;
    }
    return false;
  }
  /**
   * @description clean cache by key prefix
   * @param key cache key prefix
   */
  public async clean(key?: string) {
    if (key) {
      const reg = new RegExp('^' + escapeReg(this.cachePrefix(key)));
      const keys: any = await this.collection.remove({ key: reg});
      const result = keys.toJSON();
      if (result) {
        return (result.ok) ? true : false;
      }
    }
    if (await this.collection.remove({})) {
      return true;
    }
    return false;
  }
  /**
   * @description read cache
   * @param key read key
   */
  public async read(key: string) {
    let data = await this.collection.findOne({key: this.cachePrefix(key)}, {projection: { value: 1 }});
    if (data) {
      data = JSON.parse(data.value);
      return data;
    }
    return '';
  }
  /**
   * @description seach cache by key
   * @param key search key
   */
  public async search(key: string) {
    const reg = new RegExp('^' + escapeReg(this.cachePrefix(key)));
    const keys =  await this.collection.find({ key: reg}, {projection: {  key: 1, value: 1 }}).toArray();
    const result = {} as any;
    if (keys) {
      keys.forEach((item: any) => {
        result[this.removePrefix(item.key)] = JSON.parse(item.value)
      })
      return result;
    }
  }
  /**
   * @description write the cache
   * @param key cache key
   * @param value cache value
   */
  public async write(key: string, value: any) {
    value = JSON.stringify(value);
    if (await this.collection.insertOne({ key: this.cachePrefix(key), value})) {
      return true;
    }
    return false;
  }

  private cachePrefix(key: string) {
    return 'ncache:' + key;
  }
  private removePrefix(key: string) {
    return key.replace(/^ncache\:/, '');
  }
}

module.exports = Mongodb;