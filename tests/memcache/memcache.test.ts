import { config } from '../../src/index';
interface IRes {
  ncache: string
}
describe('memcache', () => {
  let mem: any;
  beforeAll(async () => {
    mem = config({
      store: 'memcache',
      options: {
        mysql: {
          database: 'ncache',
          username: 'root',
          password: 'root123456',
          host: 'localhost'
        }
      }
    })
    await mem.init();
    await mem.write('mem_test1', { ncache: 'testing1' });
    await mem.write('mem_test2', { ncache: 'testing2' });
    await mem.write('mem_test3', { ncache: 'testing3' });
  });
  afterAll(async () => {
    await mem.clean('mem_test');
    mem.destory();
  });

  test('mem read', async () => {
    expect.assertions(1);
    await mem.read('mem_test1').then((res: IRes) => {
      expect(res.ncache).toBe('testing1');
    })
  });

  test('mem search alias read', async () => {
    expect.assertions(2);
    await mem.search('mem_test3').then((res: IRes) => {
      expect(res.ncache).toBe('testing3');
    })
    await mem.search('mem_test2').then((res: IRes) => {
      expect(res.ncache).toBe('testing2');
    })
  });
  test('mem clean', async () => {
    expect.assertions(1);
    await mem.write('prefix_test_write1', { ncache: 'prefix_test_write1' }, 100)
    await mem.write('prefix_test_write2', { ncache: 'prefix_test_write2' }, 100)
    await mem.write('prefix_test_write3', { ncache: 'prefix_test_write3' }, 100)
    await mem.clean();
    await mem.read('prefix_test_write1').then((res: any) => {
      expect(res).toBe('');
    })
  });
})
