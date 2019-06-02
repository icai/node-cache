import { config } from '../../src/index';

describe('file', () => {
  let file: any;
  beforeAll(async () => {
    file = config({
      store: 'file',
      options: {
      }
    })
    await file.clean();
    await file.write('file_test1', { ncache: 'testing1' });
    await file.write('file_test2', { ncache: 'testing2' });
    await file.write('file_test3', { ncache: 'testing3' });
  });
  afterAll(async () => {
    await file.clean('file_test');
    file.destory();
  });

  test('file read', async () => {
    expect.assertions(1);
    await file.read('file_test1').then((res: any) => {
      expect(res.ncache).toBe('testing1');
    })
  });

  test('file search', async () => {
    expect.assertions(2);
    await file.search('file_test3').then((res: any) => {
      expect(res.ncache).toBe('testing3');
    })
    await file.search('file_test2').then((res: any) => {
      expect(res.ncache).toBe('testing2');
    })
  });
  test('file clean with prefix', async () => {
    expect.assertions(1);
    await file.write('prefix_test_write1', { ncache: 'prefix_test_write1' })
    await file.write('prefix_test_write2', { ncache: 'prefix_test_write2' })
    await file.write('prefix_test_write3', { ncache: 'prefix_test_write3' })
    await file.clean('prefix_test_write1');
    await file.read('prefix_test_write1').then((res: any) => {
      expect(res).toBe('');
    })
  });

  test('file delete', async () => {
    expect.assertions(1);
    await file.write('prefix_test_write1', { ncache: 'prefix_test_write1' })
    await file.delete('prefix_test_write1');
    await file.read('prefix_test_write1').then((res: any) => {
      expect(res).toBe('');
    })
  });

  test('file insert conflict', async () => {
    expect.assertions(2);
    await file.write('prefix_test_write1', { ncache: 'prefix_test_write1' })
    await file.write('prefix_test_write1', { ncache: 'prefix_test_write1_alias' })
    await file.read('prefix_test_write1').then((res: any) => {
      expect(res.ncache).toBe('prefix_test_write1_alias');
    })
    await file.delete('prefix_test_write1');
    await file.read('prefix_test_write1').then((res: any) => {
      expect(res).toBe('');
    })
  });
})
