import { ICache } from '../@type/cache';
import { tablename } from '../utils/func';

export class Memcache implements ICache {
  constructor(options: any) {
  }
  public read(key: string) {

  }
  /**
   * seach cache by key prefix
   * @param prefix key prefix
   */
  public search(prefix: string) {

  }
  /**
   * write the cache
   * @param key cache key
   * @param data cache value
   * @param expire expire date
   */
  public write(key: string, data: any, expire = 0) {

  }
  /**
   * delete cache
   * @param key cache key
   */
  public delete(key: string) {

  }
  /**
   * clean cache by key prefix
   * @param prefix cache key prefix
   */
  public clean(prefix?: string) {

  }
  public cachePrefix() {

  }
}