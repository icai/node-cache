
import cacache from 'cacache';
import path from 'path';
import { ICache } from '../types/cache';
import { escapeReg } from '../utils/func';

const CACHE_FILE_PATH = path.resolve(__dirname, '.cache');

export default class File implements ICache {
  private cachePath: string;
  constructor(options: any) {
    this.cachePath = options.path || CACHE_FILE_PATH;
    return this;
  }
  public destory() {
    return cacache.rm.all(this.cachePath)
  }
  /**
   * delete cache
   * @param key cache key
   */
  public async delete(key: string) {
    return cacache.rm(this.cachePath, this.cachePrefix(key))
  }
  /**
   * clean cache
   * @param dir cache dir
   */
  public async clean(dir?: string) {
    return cacache.rm.all(this.cachePath);
  }
  /**
   * read cache
   * @param key read key
   */
  public async read(key: string) {
    const rkey = this.cachePrefix(key);
    if (await cacache.get.info(this.cachePath, rkey)) {
      let data: any = await cacache.get(this.cachePath, rkey);
      if (data) {
        data = JSON.parse(data.data.toString());
        return data;
      }
      return '';
    }
    return '';
  }
  /**
   * seach cache alias read
   * @param key search key
   */
  public async search(key: string) {
    return this.read(key);
  }
  /**
   * write the cache
   * @param key cache key
   * @param data cache value
   * @param ttl ttl
   */
  public async write(key: string, value: any) {
    value = JSON.stringify(value);
    if (await cacache.put(this.cachePath, this.cachePrefix(key), value)) {
      return true;
    }
    return false;
  }

  private cachePrefix(key: string) {
    return 'ncache:' + key;
  }
}

module.exports = File;