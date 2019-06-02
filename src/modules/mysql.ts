import { QueryTypes, Sequelize } from 'sequelize';
import { ICache } from '../types/cache';
import { tablename } from '../utils/func';
/**
 * @class Mysql
 * @classdesc Mysql cache
 */
export default class Mysql implements ICache {
  private sequelize: Sequelize;
  constructor({ database, username, password, localhost, dialect, ...rest}: any) {
    this.sequelize = new Sequelize(database, username, password, {
      host: localhost,
      /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
      dialect: dialect || 'mysql',
      ...rest
    });
    return this;
  }
  /**
   * @description destory mysql instance
   */
  public destory() {
    this.sequelize.close();
  }
  /**
   * @description init database
   */
  public async init() {
    await this.sequelize.query(`
      DROP TABLE IF EXISTS \`${tablename(`core_cache`)}\`
    `, { type: QueryTypes.RAW})
    await this.sequelize.query(`
      CREATE TABLE \`${tablename(`core_cache`)}\` (
        \`key\` varchar(50) NOT NULL,
        \`value\` longtext NOT NULL,
        PRIMARY KEY (\`key\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC
    `, { type: QueryTypes.RAW})
  }
  /**
   * @description read cache by key
   * @param key the cache key
   */
  public async read(key: string) {
    const sequelize = this.sequelize;
    const cachedatas = await sequelize.query(
      `SELECT value FROM \`${tablename(`core_cache`)}\` WHERE \`key\`=:key LIMIT 1`,
      {  replacements: { key }, type: QueryTypes.SELECT}
    )
    if (!cachedatas.length) {
      return '';
    }
    const value: string = (cachedatas[0] as any).value;
    const cachedata = JSON.parse(value);
    if (!cachedata.expire && !cachedata.data) {
      if (cachedata.expire > Date.now()) {
        return cachedata.data;
      } else {
        return '';
      }

    } else {
      return cachedata
    }
  }
  /**
   * @description seach cache by key prefix
   * @param prefix key prefix
   */
  public async search(prefix: string) {
    const sequelize = this.sequelize;
    const data = await sequelize.query(
      `SELECT * FROM \`${tablename(`core_cache`)}\`  WHERE \`key\` LIKE :key`,
      { replacements: { key: `${prefix}%` }, type: QueryTypes.SELECT}
    )
    const result = {} as {[x: string]: any};
    data.forEach((el: any) => {
      result[el.key] = JSON.parse(el.value)
    });
    return result;
  }
  /**
   * @description write the cache
   * @param key cache key
   * @param data cache value
   * @param expire expire date
   */
  public async write(key: string, data: any, expire = 0) {
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
    const sql = 'INSERT INTO ' + tablename(`core_cache`) +
    ' (`key`,`value`) VALUES (:key, :value) ON DUPLICATE KEY UPDATE value=:value';
    const result = await sequelize.query(sql,
      { replacements: { key: record.key, value: record.value}, type: QueryTypes.UPSERT}
    );
    if (!result) {
      return false
    } else {
      return result
    }
  }
  /**
   * @description delete cache
   * @param key cache key
   */
  public async delete(key: string) {
    const sequelize = this.sequelize;
    const sql = 'DELETE FROM ' + tablename('core_cache') + ' WHERE `key`=:key';
    return await sequelize.query(sql, { replacements: { key }, type: QueryTypes.DELETE});
  }
  /**
   * @description clean cache by key prefix
   * @param prefix cache key prefix
   */
  public async clean(prefix?: string) {
    const sequelize = this.sequelize;
    let result;
    if (!prefix) {
      const sql = 'DELETE FROM ' + tablename('core_cache');
      result = sequelize.query(sql, { type: QueryTypes.DELETE});
    } else {
      const sql =  'DELETE FROM ' + tablename('core_cache') + ' WHERE `key` LIKE :key';
      result = sequelize.query(sql, {replacements: {key: `${prefix}%` },  type: QueryTypes.DELETE});
    }
    return result
  }
}

module.exports = Mysql;