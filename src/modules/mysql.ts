import { QueryTypes, Sequelize } from 'sequelize';
import { ICache } from '../interfaces/cache';
import { tablename } from '../utils/func';

export class Mysql implements ICache {
  // private options: any;
  private sequelize: Sequelize;
  constructor(options: any) {
    // this.options = options;
    this.sequelize = new Sequelize(options.database, options.username, options.password, {
      host: options.localhost,
      /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
      dialect: options.dialect || 'mysql'
    });
    return this;
  }
  public read(key: string) {
    const sequelize = this.sequelize;
    return sequelize.query(
      `SELECT value FROM \`${tablename(`core_cache`)}\`  WHERE key=${key} LIMIT 1`,
      { type: QueryTypes.SELECT}
    )
  }
  /**
   * seach cache by key prefix
   * @param prefix key prefix
   */
  public search(prefix: string) {
    const sequelize = this.sequelize;
    return sequelize.query(
      `SELECT value FROM \`${tablename(`core_cache`)}\`  WHERE key LIKE :key`,
      { replacements: { key: `${prefix}%` }, type: QueryTypes.SELECT}
    )
  }
  /**
   * write the cache
   * @param key cache key
   * @param data cache value
   * @param expire expire date
   */
  public write(key: string, data: any, expire = 0) {
    if (!key || !data) {
      return false
    }
    const record = {} as any;
    record.key = key;
    let cacheData = {};
    if (!expire) {
      cacheData = {
        expire: Date.now() + expire,
        data
      };
    } else {
      cacheData = data;
    }
    record.value = JSON.stringify(cacheData);
    const sequelize = this.sequelize;
    return sequelize.query(tablename(`core_cache`), record);
  }
  /**
   * delete cache
   * @param key cache key
   */
  public delete(key: string) {
    const sequelize = this.sequelize;
    const sql = 'DELETE FROM ' + tablename('core_cache') + ' WHERE `key`=:key';
    return sequelize.query(sql, { replacements: { key }, type: QueryTypes.DELETE});
  }
  /**
   * clean cache by key prefix
   * @param prefix cache key prefix
   */
  public clean(prefix?: string) {
    const sequelize = this.sequelize;
    if (!prefix) {
      const sql = 'DELETE FROM ' + tablename('core_cache');
      return sequelize.query(sql, { type: QueryTypes.DELETE});
    } else {
      const sql =  'DELETE FROM ' + tablename('core_cache') + ' WHERE `key` LIKE :key';
      return sequelize.query(sql, {replacements: {key: `${prefix}:%` },  type: QueryTypes.DELETE});
    }
  }
}