const CACHE_KEY_LENGTH = 128;

import File from './modules/file';
import LRU from './modules/lru';
import Memcache from './modules/memcache';
import Mysql from './modules/mysql';
import Redis from './modules/redis';
import { ICache } from './types/cache';

interface IOptions {
  store: string,
  options: object
}
export const config = (options: IOptions) => {
  let store;
  if (options.store) {
    const Store = require('./modules/' + options.store);
    store = new Store(options.options);
  }
  return store as (Mysql| Memcache | Redis | File | LRU | ICache);
}
export const cacheKey = (cachekey: string) => {
  cachekey = 'ncache:' + cachekey;
  if (cachekey.length > CACHE_KEY_LENGTH) {
    throw new Error('Cache name is over the maximum length');
  }
  return cachekey;
}