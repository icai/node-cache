
import MemcachePlus from 'memcache-plus';
import { ICache } from '../types/cache';
import { random } from '../utils/func';
import Mysql from './mysql';
/**
 * @class Memcache
 * @classdesc Memcache cache
 */
export default class Memcache implements ICache {
  private memcache: MemcachePlus;
  private dbcache: Mysql;
  constructor({ hosts, mysql, netTimeout, ...rest}: any) {
    // use for forcecache
    this.dbcache = new Mysql(mysql);
    this.memcache = new MemcachePlus({
      hosts: hosts || ['127.0.0.1:11211'],
      // Decrease the netTimeout from the 500ms default to 200ms
      netTimeout: netTimeout || 30,
      ...rest
    });
    return this;
  }
  public destory() {
    this.dbcache.destory();
    this.memcache.disconnect();
  }
  public async init() {
    await this.dbcache.init();
  }

  /**
   * delete cache
   * @param key cache key
   */
  public async delete(key: string, forcecache = true) {
    key = await this.namespace(key);
    if (!forcecache) {
      this.dbcache.delete(key);
    }
    const result = await this.memcacheDelete(this.cachePrefix(key))
    if (result) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * clean cache by key prefix
   * @param prefix cache key prefix
   */
  public async clean(prefix?: string) {
    if (prefix) {
      const namespace = await this.namespace(prefix, true);
      this.dbcache.clean(namespace);
      // await this.cleanByPrefix(prefix);
      return true;
    }
    const result = await this.memcacheFlush();
    if (result) {
      await this.dbcache.clean();
      return true;
    } else {
      return false;
    }
  }
  public async cleanByPrefix(prefix: string) {
    await this.memcache.items()
    .then((items) => {
      // tslint:disable-next-line:no-console
      console.info(items)
    })
  }
  /**
   * read the cache
   * @param key cache key
   * @param forcecache use force cache, default `true`
   */
  public async read(key: string, forcecache = true) {
    key = await this.namespace(key);
    let result = await this.memcacheGet(this.cachePrefix(key));
    if (!result && !forcecache) {
      const dbcache = await this.dbcache.read(key);
      if (dbcache.value) {
        result = JSON.parse(dbcache.value);
        this.memcacheSet(this.cachePrefix(key), result);
      }
    }
    return result;
  }
  /**
   * seach cache by key
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
  public async write(key: string, value: any, ttl = 0, forcecache = true) {
    key = await this.namespace(key);
    if (!forcecache) {
      this.dbcache.write(key, value);
    }
    const result = await this.memcacheSet(this.cachePrefix(key), value, ttl)
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  private cachePrefix(key: string) {
    return 'ncache:' + key;
  }

  private async memcacheGet(key: string) {
    return new Promise((resolve, reject) => {
      this.memcache.get(key).then((res: any) => {
        resolve(res || '')
      });
    })
  }
  private async memcacheSet(key: string, value: any, ttl?: number) {
    return new Promise((resolve, reject) => {
      this.memcache.set(key, value, ttl, () => {
        resolve(true)
      });
    })
  }

  private async memcacheDelete(key: string) {
    return new Promise((resolve, reject) => {
      this.memcache.delete(key, (res: any) => {
        resolve()
      });
    })
  }

  private async memcacheFlush(delay?: number) {
    return new Promise((resolve, reject) => {
      this.memcache.flush(delay).then((res: any) => {
        resolve()
      });
    })
  }

  private async namespace(key: string, forcenew = false) {
    let namespaceCacheKey = '';
    // tslint:disable-next-line:no-bitwise
    if (!~key.indexOf(':')) {
      namespaceCacheKey = key;
    } else {
      const [key1, key2] = key.split(':');
      if (key1 == 'ncache') {
        namespaceCacheKey = key2;
      } else {
        namespaceCacheKey = key1;
      }
    }
    namespaceCacheKey = 'cachensl:' + namespaceCacheKey;
    let namespace = await this.memcacheGet(this.cachePrefix(namespaceCacheKey));
    if (!namespace || forcenew) {
      namespace = random(5);
      await this.memcacheSet(this.cachePrefix(namespaceCacheKey), namespace, 0);
    }
    return namespace + ':' + key;
  }
}

module.exports = Memcache;