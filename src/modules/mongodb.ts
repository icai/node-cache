
import mongoose, { Document, Model, Schema } from 'mongoose';
import { ICache } from '../types/cache';
import { escapeReg } from '../utils/func';

/**
 * @class Mongodb
 * @classdesc Mongodb cache
 */
export default class Mongodb implements ICache {
  // private client: MongoClient;
  private collection: Model<Document>;
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
    mongoose.connection.close()
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
    const conn = await mongoose.createConnection(`${url}/${dbName}`, {useNewUrlParser: true});
    const schema = new Schema({
      key: {
        type: String,
        index: true,
        unique: true
      },
      value: String
    }, { collection: dbCollection });

    const NcacheModel = conn.model(dbCollection, schema);
    this.collection = NcacheModel;

    return this;
  }
  /**
   * @description delete cache
   * @param key cache key
   */
  public async delete(key: string) {
    const result: any = await this.collection.deleteOne({ key: this.cachePrefix(key)});
    // const result = keys.toJSON()
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
      const result: any = await this.collection.remove({ key: reg});
      // const result = keys.toJSON();
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
    // {projection: { value: 1 }}
    let data: any = await this.collection.findOne({key: this.cachePrefix(key)}, 'value');
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
    // {projection: {  key: 1, value: 1 }}
    const keys =  await this.collection.find({ key: reg}, 'key value');
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
    if (await this.collection.findOneAndUpdate(
     { key: this.cachePrefix(key)},
     { value}, { upsert: true, new: true })) {
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