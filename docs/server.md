### 文件结构

服务端的文件结构如下：

* logs  日志文件
* middlewares 中间件
* models  数据库模型
* public  静态文件
* routes  路由
* utils 工具集
* views 模板文件
* config.json 配置文件
* index.js  入口文件
* package.json

### 依赖模块

服务端所需的依赖模块列表如下：

> 点击依赖模块的名称，可进入相应的官网或官方文档。

|                    名称                    |          作用           |
| :--------------------------------------: | :-------------------: |
| [axios](https://github.com/mzabriskie/axios) | 基于 Promise 的 HTTP 客户端 |
| [body-parser](https://github.com/expressjs/body-parser) |    解析 HTTP 请求体的中间件    |
|    [ejs](https://github.com/mde/ejs)     |    JavaScript 模板引擎    |
|     [express](http://expressjs.com/)     |    Node.js Web 框架     |
| [express-session](https://github.com/expressjs/session) |      Session 中间件      |
| [md5](https://www.npmjs.com/package/md5) |         md5 库         |
| [morgan](https://github.com/expressjs/morgan) |     HTTP 请求日志中间件      |
| [mysql](https://github.com/mysqljs/mysql) |       MySQL 驱动        |
| [sequelize](http://docs.sequelizejs.com/en/v3/) |       MySQL ORM       |