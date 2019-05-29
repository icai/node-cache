export interface ICache {
  write: Function,
  delete: Function,
  search: Function,
  clean: Function
}