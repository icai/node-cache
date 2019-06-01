## Classes

<dl>
<dt><a href="#LRU">LRU</a></dt>
<dd><p>LRU Cache</p>
</dd>
<dt><a href="#Memcache">Memcache</a></dt>
<dd><p>Memcache cache</p>
</dd>
<dt><a href="#File">File</a></dt>
<dd><p>File cache</p>
</dd>
<dt><a href="#Mysql">Mysql</a></dt>
<dd><p>Mysql cache</p>
</dd>
<dt><a href="#Redis">Redis</a></dt>
<dd><p>Redis cache</p>
</dd>
<dt><a href="#Mongodb">Mongodb</a></dt>
<dd><p>Mongodb cache</p>
</dd>
</dl>

<a name="LRU"></a>

## LRU
LRU Cache

**Kind**: global class  

* [LRU](#LRU)
    * [.destory()](#LRU+destory)
    * [.delete(key)](#LRU+delete)
    * [.clean(key)](#LRU+clean)
    * [.read(key)](#LRU+read)
    * [.search(key)](#LRU+search)
    * [.write(key, value)](#LRU+write)

<a name="LRU+destory"></a>

### lrU.destory()
lru reset

**Kind**: instance method of [<code>LRU</code>](#LRU)  
<a name="LRU+delete"></a>

### lrU.delete(key)
delete cache

**Kind**: instance method of [<code>LRU</code>](#LRU)  

| Param | Description |
| --- | --- |
| key | cache key |

<a name="LRU+clean"></a>

### lrU.clean(key)
clean cache by key prefix

**Kind**: instance method of [<code>LRU</code>](#LRU)  

| Param | Description |
| --- | --- |
| key | cache key prefix |

<a name="LRU+read"></a>

### lrU.read(key)
read cache

**Kind**: instance method of [<code>LRU</code>](#LRU)  

| Param | Description |
| --- | --- |
| key | read key |

<a name="LRU+search"></a>

### lrU.search(key)
seach cache by key

**Kind**: instance method of [<code>LRU</code>](#LRU)  

| Param | Description |
| --- | --- |
| key | search key |

<a name="LRU+write"></a>

### lrU.write(key, value)
write the cache

**Kind**: instance method of [<code>LRU</code>](#LRU)  

| Param | Description |
| --- | --- |
| key | cache key |
| value | cache value |

<a name="Memcache"></a>

## Memcache
Memcache cache

**Kind**: global class  

* [Memcache](#Memcache)
    * [.delete(key)](#Memcache+delete)
    * [.clean(prefix)](#Memcache+clean)
    * [.read(key, forcecache)](#Memcache+read)
    * [.search(key)](#Memcache+search)
    * [.write(key, data, ttl)](#Memcache+write)

<a name="Memcache+delete"></a>

### memcache.delete(key)
delete cache

**Kind**: instance method of [<code>Memcache</code>](#Memcache)  

| Param | Description |
| --- | --- |
| key | cache key |

<a name="Memcache+clean"></a>

### memcache.clean(prefix)
clean cache by key prefix

**Kind**: instance method of [<code>Memcache</code>](#Memcache)  

| Param | Description |
| --- | --- |
| prefix | cache key prefix |

<a name="Memcache+read"></a>

### memcache.read(key, forcecache)
**Kind**: instance method of [<code>Memcache</code>](#Memcache)  

| Param | Default |
| --- | --- |
| key |  | 
| forcecache | <code>true</code> | 

<a name="Memcache+search"></a>

### memcache.search(key)
seach cache by key

**Kind**: instance method of [<code>Memcache</code>](#Memcache)  

| Param | Description |
| --- | --- |
| key | search key |

<a name="Memcache+write"></a>

### memcache.write(key, data, ttl)
write the cache

**Kind**: instance method of [<code>Memcache</code>](#Memcache)  

| Param | Description |
| --- | --- |
| key | cache key |
| data | cache value |
| ttl | ttl |

<a name="File"></a>

## File
File cache

**Kind**: global class  

* [File](#File)
    * [.delete(key)](#File+delete)
    * [.clean(dir)](#File+clean)
    * [.read(key)](#File+read)
    * [.search(key)](#File+search)
    * [.write(key, value)](#File+write)

<a name="File+delete"></a>

### file.delete(key)
delete cache

**Kind**: instance method of [<code>File</code>](#File)  

| Param | Description |
| --- | --- |
| key | cache key |

<a name="File+clean"></a>

### file.clean(dir)
clean cache

**Kind**: instance method of [<code>File</code>](#File)  

| Param | Description |
| --- | --- |
| dir | cache dir |

<a name="File+read"></a>

### file.read(key)
read cache

**Kind**: instance method of [<code>File</code>](#File)  

| Param | Description |
| --- | --- |
| key | read key |

<a name="File+search"></a>

### file.search(key)
seach cache alias read

**Kind**: instance method of [<code>File</code>](#File)  

| Param | Description |
| --- | --- |
| key | search key |

<a name="File+write"></a>

### file.write(key, value)
write the cache

**Kind**: instance method of [<code>File</code>](#File)  

| Param | Description |
| --- | --- |
| key | cache key |
| value | cache value |

<a name="Mysql"></a>

## Mysql
Mysql cache

**Kind**: global class  

* [Mysql](#Mysql)
    * [.destory()](#Mysql+destory)
    * [.init()](#Mysql+init)
    * [.read(key)](#Mysql+read)
    * [.search(prefix)](#Mysql+search)
    * [.write(key, data, expire)](#Mysql+write)
    * [.delete(key)](#Mysql+delete)
    * [.clean(prefix)](#Mysql+clean)

<a name="Mysql+destory"></a>

### mysql.destory()
destory mysql instance

**Kind**: instance method of [<code>Mysql</code>](#Mysql)  
<a name="Mysql+init"></a>

### mysql.init()
init database

**Kind**: instance method of [<code>Mysql</code>](#Mysql)  
<a name="Mysql+read"></a>

### mysql.read(key)
read cache by key

**Kind**: instance method of [<code>Mysql</code>](#Mysql)  

| Param | Description |
| --- | --- |
| key | the cache key |

<a name="Mysql+search"></a>

### mysql.search(prefix)
seach cache by key prefix

**Kind**: instance method of [<code>Mysql</code>](#Mysql)  

| Param | Description |
| --- | --- |
| prefix | key prefix |

<a name="Mysql+write"></a>

### mysql.write(key, data, expire)
write the cache

**Kind**: instance method of [<code>Mysql</code>](#Mysql)  

| Param | Default | Description |
| --- | --- | --- |
| key |  | cache key |
| data |  | cache value |
| expire | <code>0</code> | expire date |

<a name="Mysql+delete"></a>

### mysql.delete(key)
delete cache

**Kind**: instance method of [<code>Mysql</code>](#Mysql)  

| Param | Description |
| --- | --- |
| key | cache key |

<a name="Mysql+clean"></a>

### mysql.clean(prefix)
clean cache by key prefix

**Kind**: instance method of [<code>Mysql</code>](#Mysql)  

| Param | Description |
| --- | --- |
| prefix | cache key prefix |

<a name="Redis"></a>

## Redis
Redis cache

**Kind**: global class  

* [Redis](#Redis)
    * [.destory()](#Redis+destory)
    * [.delete(key)](#Redis+delete)
    * [.clean(key)](#Redis+clean)
    * [.read(key)](#Redis+read)
    * [.search(key)](#Redis+search)
    * [.write(key, data, ttl)](#Redis+write)

<a name="Redis+destory"></a>

### redis.destory()
redis quit

**Kind**: instance method of [<code>Redis</code>](#Redis)  
<a name="Redis+delete"></a>

### redis.delete(key)
delete cache

**Kind**: instance method of [<code>Redis</code>](#Redis)  

| Param | Description |
| --- | --- |
| key | cache key |

<a name="Redis+clean"></a>

### redis.clean(key)
clean cache by key prefix

**Kind**: instance method of [<code>Redis</code>](#Redis)  

| Param | Description |
| --- | --- |
| key | cache key prefix |

<a name="Redis+read"></a>

### redis.read(key)
read cache

**Kind**: instance method of [<code>Redis</code>](#Redis)  

| Param | Description |
| --- | --- |
| key | read key |

<a name="Redis+search"></a>

### redis.search(key)
seach cache by key

**Kind**: instance method of [<code>Redis</code>](#Redis)  

| Param | Description |
| --- | --- |
| key | search key |

<a name="Redis+write"></a>

### redis.write(key, data, ttl)
write the cache

**Kind**: instance method of [<code>Redis</code>](#Redis)  

| Param | Description |
| --- | --- |
| key | cache key |
| data | cache value |
| ttl | cache expire time |

<a name="Mongodb"></a>

## Mongodb
Mongodb cache

**Kind**: global class  

* [Mongodb](#Mongodb)
    * [.destory()](#Mongodb+destory)
    * [.init(options)](#Mongodb+init)
    * [.delete(key)](#Mongodb+delete)
    * [.clean(key)](#Mongodb+clean)
    * [.read(key)](#Mongodb+read)
    * [.search(key)](#Mongodb+search)
    * [.write(key, value)](#Mongodb+write)

<a name="Mongodb+destory"></a>

### mongodb.destory()
mongodb close

**Kind**: instance method of [<code>Mongodb</code>](#Mongodb)  
<a name="Mongodb+init"></a>

### mongodb.init(options)
mongodb init, createCollection etc.

**Kind**: instance method of [<code>Mongodb</code>](#Mongodb)  

| Param | Description |
| --- | --- |
| options | constructor options |

<a name="Mongodb+delete"></a>

### mongodb.delete(key)
delete cache

**Kind**: instance method of [<code>Mongodb</code>](#Mongodb)  

| Param | Description |
| --- | --- |
| key | cache key |

<a name="Mongodb+clean"></a>

### mongodb.clean(key)
clean cache by key prefix

**Kind**: instance method of [<code>Mongodb</code>](#Mongodb)  

| Param | Description |
| --- | --- |
| key | cache key prefix |

<a name="Mongodb+read"></a>

### mongodb.read(key)
read cache

**Kind**: instance method of [<code>Mongodb</code>](#Mongodb)  

| Param | Description |
| --- | --- |
| key | read key |

<a name="Mongodb+search"></a>

### mongodb.search(key)
seach cache by key

**Kind**: instance method of [<code>Mongodb</code>](#Mongodb)  

| Param | Description |
| --- | --- |
| key | search key |

<a name="Mongodb+write"></a>

### mongodb.write(key, value)
write the cache

**Kind**: instance method of [<code>Mongodb</code>](#Mongodb)  

| Param | Description |
| --- | --- |
| key | cache key |
| value | cache value |

