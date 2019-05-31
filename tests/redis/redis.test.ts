import { config } from '../../src/index';

describe('redis', () => {
  let redis: any;
  beforeAll(async () => {
    redis = config({
      store: 'redis',
      options: {
        port: 6379,
        host: '127.0.0.1'
      }
    })
    await redis.init();
    await redis.clean();
    await redis.write('redis_test1', { ncache: 'testing1' });
    await redis.write('redis_test2', { ncache: 'testing2' });
    await redis.write('redis_test3', { ncache: 'testing3' });
  });
  afterAll(async () => {
    await redis.clean('redis_test');
    redis.destory();
  });

  test('redis read', async () => {
    expect.assertions(1);
    await redis.read('redis_test1').then((res: any) => {
      expect(res.ncache).toBe('testing1');
    })
  });

  test('redis search', async () => {
    expect.assertions(2);
    await redis.search('redis').then((res: any) => {
      expect(res.redis_test3.ncache).toBe('testing3');
    })
    await redis.search('redis_test').then((res: any) => {
      expect(res.redis_test2.ncache).toBe('testing2');
    })
  });
  test('redis clean with prefix', async () => {
    expect.assertions(1);
    await redis.write('prefix_test_write1', { ncache: 'prefix_test_write1' })
    await redis.write('prefix_test_write2', { ncache: 'prefix_test_write2' })
    await redis.write('prefix_test_write3', { ncache: 'prefix_test_write3' })
    await redis.clean('prefix')
    await redis.read('prefix_test_write1').then((res: any) => {
      expect(res).toBe('');
    })
  });

  test('redis delete', async () => {
    expect.assertions(1);
    await redis.write('prefix_test_delete1', { ncache: 'prefix_test_delete1' })
    await redis.delete('prefix_test_delete1');
    await redis.read('prefix_test_delete1').then((res: any) => {
      expect(res).toBe('');
    })
  });
})
