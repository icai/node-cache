
import LRUCache from 'lru-cache';
import { ICache } from '../types/cache';
import { escapeReg } from '../utils/func';

export default class LRU implements ICache {
  private cache: LRUCache<string, string>;
  constructor(options: any) {
    this.cache = new LRUCache(options);
    return this;
  }
  public destory() {
    this.cache.reset();
  }
  /**
   * delete cache
   * @param key cache key
   */
  public async delete(key: string) {
    this.cache.del(this.cachePrefix(key))
  }
  /**
   * clean cache by key prefix
   * @param key cache key prefix
   */
  public async clean(key?: string) {
    if (key) {
      const keys: any =  await this.cache.keys()
      if (keys) {
        const reg = new RegExp('^' + escapeReg(this.cachePrefix(key)));
        keys.forEach((element: string) => {
          if (reg.test(element)) {
            this.cache.del(element);
          }
        });
        return true;
      }
    }
    this.cache.reset();
  }
  /**
   * read cache
   * @param key read key
   */
  public async read(key: string) {
    const rkey = this.cachePrefix(key);
    if (this.cache.has(rkey)) {
      let data = this.cache.get(rkey);
      if (data) {
        data = JSON.parse(data);
        return data;
      }
      return '';
    }
    return '';
  }
  /**
   * seach cache by key
   * @param key search key
   */
  public async search(key: string) {
    const keys = this.cache.keys();
    const reg = new RegExp('^' + escapeReg(this.cachePrefix(key)));
    const rkeys: any = [];
    keys.forEach((element: string) => {
      if (reg.test(element)) {
        rkeys.push(element);
      }
    });
    const searchdata = {} as any;
    if (rkeys) {
      for (const skey of rkeys) {
        const value = this.cache.get(skey)
        searchdata[this.removePrefix(skey)] = JSON.parse(value || '');
      }
    }
    return searchdata;
  }
  /**
   * write the cache
   * @param key cache key
   * @param data cache value
   * @param ttl ttl
   */
  public async write(key: string, value: any) {
    value = JSON.stringify(value);
    if (this.cache.set(this.cachePrefix(key), value)) {
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

module.exports = LRU;