export = index;
declare class index {
  constructor(opts: any);
  buffer: any;
  add(key: any, val: any, ttl: any, cb: any): any;
  append(key: any, val: any, ttl: any, cb: any): any;
  cachedump(slabsId: any, limit: any, cb: any): any;
  cas(key: any, val: any, cas: any, ttl: any, cb: any): any;
  connect(): void;
  connectToHosts(): void;
  decr(key: any, val: any, cb: any): any;
  deleteMulti(keys: any, cb: any): any;
  disconnect(opts: any): any;
  flush(delay: any, cb: any): any;
  flushBuffer(err: any): void;
  get(key: any, opts: any, cb: any): any;
  getHostList(): any;
  getMulti(keys: any, opts: any, cb: any): any;
  gets(key: any, opts: any, cb: any): any;
  incr(key: any, val: any, cb: any): any;
  items(cb: any): any;
  prepend(key: any, val: any, ttl: any, cb: any): any;
  ready(): any;
  replace(key: any, val: any, ttl: any, cb: any): any;
  run(command: any, args: any, cb: any): any;
  set(key: any, val: any, ttl: any, cb: any): any;
  splitHost(str: any): any;
  version(cb: any): any;
}
