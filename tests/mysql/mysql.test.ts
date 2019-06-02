import { config } from '../../src/index';

describe('mysql', () => {
  let mysql: any;
  beforeAll(async () => {
    mysql = config({
      store: 'mysql',
      options: {
        database: 'ncache',
        username: 'root',
        password: 'root123456',
        host: 'localhost'
      }
    })
    await mysql.init();
    await mysql.clean();
    await mysql.write('mysql_test1', { ncache: 'testing1' });
    await mysql.write('mysql_test2', { ncache: 'testing2' });
    await mysql.write('mysql_test3', { ncache: 'testing3' });
  });
  afterAll(async () => {
    await mysql.clean('mysql_test');
    mysql.destory();
  });

  test('mysql read', async () => {
    expect.assertions(1);
    await mysql.read('mysql_test1').then((res: any) => {
      expect(res.data.ncache).toBe('testing1');
    })
  });

  test('mysql search', async () => {
    expect.assertions(2);
    await mysql.search('mysql').then((res: any) => {
      expect(res.mysql_test3.data.ncache).toBe('testing3');
    })
    await mysql.search('mysql_test').then((res: any) => {
      expect(res.mysql_test2.data.ncache).toBe('testing2');
    })
  });
  test('mysql clean with prefix', async () => {
    expect.assertions(1);
    await mysql.write('prefix_test_write1', { ncache: 'prefix_test_write1' })
    await mysql.write('prefix_test_write2', { ncache: 'prefix_test_write2' })
    await mysql.write('prefix_test_write3', { ncache: 'prefix_test_write3' })
    await mysql.clean('prefix')
    await mysql.read('prefix_test_write1').then((res: any) => {
      expect(res).toBe('');
    })
  });
  test('mysql delete', async () => {
    expect.assertions(1);
    await mysql.write('prefix_test_delete1', { ncache: 'prefix_test_delete1' })
    await mysql.delete('prefix_test_delete1');
    await mysql.read('prefix_test_delete1').then((res: any) => {
      expect(res).toBe('');
    })
  });
  test('mysql insert conflict', async () => {
    expect.assertions(2);
    await mysql.write('prefix_test_delete1', { ncache: 'prefix_test_delete1' })
    await mysql.write('prefix_test_delete1', { ncache: 'prefix_test_delete1_alias' })
    await mysql.read('prefix_test_delete1').then((res: any) => {
      expect(res.data.ncache).toBe('prefix_test_delete1_alias');
    })
    await mysql.delete('prefix_test_delete1');
    await mysql.read('prefix_test_delete1').then((res: any) => {
      expect(res).toBe('');
    })
  });
})
