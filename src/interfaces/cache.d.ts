export interface ICache {
  [x: string]: any,
  read: Function,
  write: Function,
  delete: Function,
  search: Function,
  clean: Function
}