import { config } from '../../src/index';

describe('mongodb', () => {
  let mongodb: any;
  beforeAll(async () => {
    mongodb = config({
      store: 'mongodb',
      options: {
        url: 'mongodb://localhost:27017'
      }
    })
    await mongodb.init();
    await mongodb.clean();
    await mongodb.write('mongodb_test1', { ncache: 'testing1' });
    await mongodb.write('mongodb_test2', { ncache: 'testing2' });
    await mongodb.write('mongodb_test3', { ncache: 'testing3' });
  });
  afterAll(async () => {
    await mongodb.clean('mongodb_test');
    mongodb.destory();
  });

  test('mongodb read', async () => {
    expect.assertions(1);
    await mongodb.read('mongodb_test1').then((res: any) => {
      expect(res.ncache).toBe('testing1');
    })
  });

  test('mongodb search', async () => {
    expect.assertions(2);
    await mongodb.search('mongodb').then((res: any) => {
      expect(res.mongodb_test3.ncache).toBe('testing3');
    })
    await mongodb.search('mongodb_test').then((res: any) => {
      expect(res.mongodb_test2.ncache).toBe('testing2');
    })
  });
  test('mongodb clean with prefix', async () => {
    expect.assertions(1);
    await mongodb.write('prefix_test_write1', { ncache: 'prefix_test_write1' })
    await mongodb.write('prefix_test_write2', { ncache: 'prefix_test_write2' })
    await mongodb.write('prefix_test_write3', { ncache: 'prefix_test_write3' })
    await mongodb.clean('prefix')
    await mongodb.read('prefix_test_write1').then((res: any) => {
      expect(res).toBe('');
    })
  });

  test('mongodb delete', async () => {
    expect.assertions(1);
    await mongodb.write('prefix_test_delete1', { ncache: 'prefix_test_delete1' })
    await mongodb.delete('prefix_test_delete1');
    await mongodb.read('prefix_test_delete1').then((res: any) => {
      expect(res).toBe('');
    })
  });
})
