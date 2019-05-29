const CACHE_KEY_LENGTH = 128;

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
  return store;
}
export const cacheKey = (cachekey: string) => {
  cachekey = 'ncache:' + cachekey;
  if (cachekey.length > CACHE_KEY_LENGTH) {
    throw new Error('Cache name is over the maximum length');
  }
  return cachekey;
}