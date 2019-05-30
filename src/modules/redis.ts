
import IORedis, { Redis as RedisClient } from 'ioredis';
import { ICache } from '../@types/cache';

const CACHE_EXPIRE_LONG =  3600;

export default class Redis implements ICache {
  private redis: RedisClient;
  constructor(options: any) {
    this.redis = new IORedis(options);
    return this;
  }
  public destory() {
    this.redis.quit();
  }
  public async init() {
    await this.redis.ping('pong');
  }
  /**
   * delete cache
   * @param key cache key
   */
  public async delete(key: string, forcecache = true) {
    if (await this.redis.del(this.cachePrefix(key))) {
      return true;
    }
    return false;
  }
  /**
   * clean cache by key prefix
   * @param key cache key prefix
   */
  public async clean(key?: string) {
    if (key) {
      const keys: any =  await this.redis.keys(this.cachePrefix(key) + '*')
      if (keys) {
        return (await this.redis.del(keys)) ? true : false;
      }
    }
    if (await this.redis.flushall()) {
      return true;
    }
    return false;
  }
  /**
   * read cache
   * @param key read key
   */
  public async read(key: string) {
    if (this.redis.exists(this.cachePrefix(key))) {
      let data = await this.redis.get(this.cachePrefix(key));
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
    const searchkeys = await this.redis.keys(this.cachePrefix(key) + '*');
    const searchdata = {} as any;
    if (searchkeys) {
      for (const skey of searchkeys) {
        const value = await this.redis.get(skey)
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
  public async write(key: string, value: any, ttl = CACHE_EXPIRE_LONG) {
    value = JSON.stringify(value);
    if (this.redis.set(this.cachePrefix(key), value, 'EX', ttl)) {
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

module.exports = Redis;