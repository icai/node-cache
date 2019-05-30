
import MemcachePlus from 'memcache-plus';
import { ICache } from '../@types/cache';
import { tablename } from '../utils/func';
import { Mysql } from './mysql';

const MEMCACHE_COMPRESSED = 0;

export class Memcache implements ICache {
  private memcache: MemcachePlus;
  private dbcache: Mysql;
  constructor(options: any) {
    this.memcache = new MemcachePlus({
      hosts: options.hosts || ['127.0.0.1'],
      // Decrease the netTimeout from the 500ms default to 200ms
      netTimeout: 30
    });
    // use for forcecache
    this.dbcache = new Mysql(options.mysql);
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

  public async read(key: string, forcecache = true) {
    key = await this.namespace(key);
    let result = this.memcacheGet(this.cachePrefix(key));
    if (!result && !forcecache) {
      const dbcache = await this.dbcache.read('key');
      if (!dbcache.value) {
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
    return await this.read(this.cachePrefix(key));
  }
  /**
   * write the cache
   * @param key cache key
   * @param data cache value
   * @param expire expire date
   */
  public async write(key: string, value: any, ttl = 0, forcecache = true) {
    key = await this.namespace(key);
    if (!forcecache) {
      this.dbcache.write(key, value);
    }
    if (this.memcacheSet(this.cachePrefix(key), value, ttl)) {
      return true;
    } else {
      return false;
    }
  }

  private cachePrefix(key: string) {
    return tablename(key);
  }
  private async memcacheGet(key: string) {
    return new Promise((resolve, reject) => {
      this.memcache.get(this.cachePrefix(key), null, (res: any) => {
        resolve(res)
      });
    })
  }
  private async memcacheSet(key: string, value: any, ttl?: number) {
    return new Promise((resolve, reject) => {
      this.memcache.set(key, value, ttl, () => {
        resolve()
      });
    })
  }

  private async memcacheDelete(key: string) {
    return new Promise((resolve, reject) => {
      this.memcache.deleteMulti(key, (res: any) => {
        resolve()
      });
    })
  }

  private async memcacheFlush(delay?: number) {
    return new Promise((resolve, reject) => {
      this.memcache.flush(delay, (res: any) => {
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
      namespace = (Math.random() * 10e5).toFixed();
      await this.memcacheSet(this.cachePrefix(namespaceCacheKey), namespace, MEMCACHE_COMPRESSED);
    }
    return namespace + ':' + key;
  }
}

module.exports = Memcache;