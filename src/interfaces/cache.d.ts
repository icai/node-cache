export interface ICache {
  [x: string]: any,
  write: Function,
  delete: Function,
  search: Function,
  clean: Function
}