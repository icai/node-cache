import { config } from '../../src/index';

describe('lru', () => {
  let lru: any;
  beforeAll(async () => {
    lru = config({
      store: 'lru',
      options: {
        max: 500,
        maxAge: 1000 * 60 * 60
      }
    })
    await lru.clean();
    await lru.write('lru_test1', { ncache: 'testing1' });
    await lru.write('lru_test2', { ncache: 'testing2' });
    await lru.write('lru_test3', { ncache: 'testing3' });
  });
  afterAll(async () => {
    await lru.clean('lru_test');
    lru.destory();
  });

  test('lru read', async () => {
    expect.assertions(1);
    await lru.read('lru_test1').then((res: any) => {
      expect(res.ncache).toBe('testing1');
    })
  });

  test('lru search', async () => {
    expect.assertions(2);
    await lru.search('lru').then((res: any) => {
      expect(res.lru_test3.ncache).toBe('testing3');
    })
    await lru.search('lru_test').then((res: any) => {
      expect(res.lru_test2.ncache).toBe('testing2');
    })
  });
  test('lru clean with prefix', async () => {
    expect.assertions(1);
    await lru.write('prefix_test_write1', { ncache: 'prefix_test_write1' })
    await lru.write('prefix_test_write2', { ncache: 'prefix_test_write2' })
    await lru.write('prefix_test_write3', { ncache: 'prefix_test_write3' })
    await lru.clean('prefix');
    await lru.read('prefix_test_write1').then((res: any) => {
      expect(res).toBe('');
    })
  });

  test('lru  delete', async () => {
    expect.assertions(1);
    await lru.write('prefix_test_write2', { ncache: 'prefix_test_write2' })
    await lru.delete('prefix_test_write2');
    await lru.read('prefix_test_write2').then((res: any) => {
      expect(res).toBe('');
    })
  });
  test('lru insert conflict', async () => {
    expect.assertions(2);
    await lru.write('prefix_test_write2', { ncache: 'prefix_test_write2' })
    await lru.write('prefix_test_write2', { ncache: 'prefix_test_write2_alias' })
    await lru.read('prefix_test_write2').then((res: any) => {
      expect(res.ncache).toBe('prefix_test_write2_alias');
    })
    await lru.delete('prefix_test_write2');
    await lru.read('prefix_test_write2').then((res: any) => {
      expect(res).toBe('');
    })
  });
})
