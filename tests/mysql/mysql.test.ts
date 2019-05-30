import { config } from '../../src/index';

test('mysql write and read', async () => {
  expect.assertions(1);
  const mysql = config({
    store: 'mysql',
    options: {
      database: 'ncache',
      username: 'root',
      password: 'root123456',
      host: 'localhost'
    }
  })
  await mysql.write('mysql_test', { ncache: 'testing'})

  await mysql.read('mysql_test').then((res: any) => {
    expect(res.data.ncache).toBe('testing');
  })
});
