export function clearMemoized(): void;
export function get(cache: any, key: any, opts?: any): Promise<unknown[]>;
export function get(cache: any, key: any, opts?: any): void;
export namespace get {
  function byDigest(cache: any, hash: any, opts: any): void;
  function copy(cache: any, key: any, dest: any, opts: any): void;
  namespace copy {
    function byDigest(cache: any, hash: any, dest: any, opts: any): void;
  }
  function hasContent(cache: any, hash: any): void;
  namespace hasContent {
    function sync(cache: any, hash: any): void;
  }
  function info(cache: any, key: any): Promise<unknown[]>;
  function info(cache: any, key: any): void;
  function stream(cache: any, key: any, opts: any): void;
  namespace stream {
    function byDigest(cache: any, hash: any, opts: any): void;
  }
  function sync(cache: any, key: any, opts: any): void;
  namespace sync {
    function byDigest(cache: any, key: any, opts: any): void;
  }
}
export function ls(cache: any): void;
export namespace ls {
  function stream(cache: any): void;
}
export function put(cache: any, key: any, data: any, opts?: any): Promise<unknown[]> | void;
export function put(cache: any, key: any, data: any, opts?: any): void;
export namespace put {
  function stream(cache: any, key: any, opts: any): void;
}
export function rm(cache: any, key: any): void;
export namespace rm {
  function all(cache: any): Promise<unknown[]>;
  function all(cache: any): void;
  function content(cache: any, hash: any): Promise<unknown[]>;
  function content(cache: any, hash: any): void;
  // Circular reference from index.rm
  const entry: any;
}
export function setLocale(lang: any): void;
export namespace tmp {
  function mkdir(cache: any, opts: any): void;
  function withTmp(cache: any, opts: any, cb: any): void;
}
export function verify(cache: any, opts: any): void;
export namespace verify {
  function lastRun(cache: any): void;
}
