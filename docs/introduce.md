### 项目结构

“青春在线+”由客户端（小程序）和服务端两部分组成，其中服务端分为 API 服务和管理中心两部分组成。

服务端的技术栈为 Linux、Nginx、Node.js 和 MySQL，基于 Express 框架开发，API 服务采用 RESTful 风格，管理中心以 AdminLTE 为前端模板、ejs 为模板引擎，数据库主要使用 MySQL，必要时可使用 MongoDB。

### 鉴权方式

为防止 API 接口被盗用，前后端交互时使用 `token` 进行验证。客户端（小程序） `token` 值在 `utils/utils.js` 文件中，服务端的 `token` 值在 `config.json` 文件中，前后端需保持一致。

!> 注意 `token` 值不要泄露，并且每次版本更新都要更新 `token`，保持前后端一致，建议使用字符串加时间戳的方式进行计算。

在进行需要验证用户权限的 API 请求（绝大部分请求）时，需要在 `wx.request` 时在 `header` 中添加 `openid`、`timestamp` 和 `key` 三个字段，`timestamp` 和 `key` 由 `utils` 中的 `sign` 函数生成，`sign` 函数的具体介绍[在这儿](client?id=sign)。

后端在收到 API 请求后，`auth` 中间件使用请求头中的 `openid` 和 `timestamp` 以及后端的 `token` 重新计算 `key` 的值，如果两个 `key` 的值一致，则继续进行下一步，如果不一致则返回错误信息。

其中 `openid` 为用户唯一标识符，`timestamp` 为当前时间的时间戳，`key` 为 `openid` + `timestamp` + `token` 的 md5 值，注意三者的顺序不要出错。