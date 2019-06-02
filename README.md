# node-cache
node cache provider using redis, memcache, lru, mysql, file


## Install

```
npm i node-caches --save

```

you need to install some dependencies for provider.

- Mysql
```
  npm i sequelize mysql2 --save
```
- Memcache
```
  npm i memcache-plus sequelize mysql2 --save
```
- File 
```
  npm i cacache --save 
```
- Redis
```
  npm i ioredis --save  
```
- LRU
```
  npm i lru-cache --save
```
- Mongodb
```
npm i mongoose --save

```

## Setup

```js

import { config } from 'node-caches'

```

mysql

```js
mysql = config({
  store: 'mysql',
  options: {
    database: 'ncache',
    username: 'root',
    password: 'root123456',
    host: 'localhost'
  }
})

```

`options` parameters will be passed to http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor

memcache

```js
  mem = config({
    store: 'memcache',
    options: {
      hosts: ['127.0.0.1:11211'],
      mysql: {
        database: 'ncache',
        username: 'root',
        password: 'root123456',
        host: 'localhost'
      }
    }
  })

```

`options` parameters will be passed to https://github.com/victorquinn/memcache-plus/blob/master/docs/initialization.md#options

`options.mysql` parameters will be passed to http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor

file

```js
  file = config({
    store: 'file',
    options: {
      path: path.resolve(__dirname, '.cache')
    }
  })
```


redis

```js
  redis = config({
    store: 'redis',
    options: {
      port: 6379,
      host: '127.0.0.1'
    }
  })
```
`options` parameters will be passed to https://github.com/luin/ioredis/blob/master/API.md#new_Redis_new

lru

```js
  lru = config({
    store: 'lru',
    options: {
      max: 500,
      maxAge: 1000 * 60 * 60
    }
  })
```

`options` parameters will be passed to  https://github.com/isaacs/node-lru-cache#options

mongodb

```js
  mongodb = config({
    store: 'mongodb',
    options: {
      url: 'mongodb://localhost:27017'
    }
  })
```

## implements ICache API

```js
export interface ICache {
  read: Function,
  write: Function,
  delete: Function,
  search: Function,
  clean: Function
}
```

Also see the [API Documentation](API.md)






## LICENSE

Copyright (c) Terry Cai. Licensed under the MIT license.









