> 客户端（小程序）除使用小程序自带的一些组件外，还使用了 [weui-wxss](https://github.com/weui/weui-wxss) 作为补充，具体用法请直接查看其 `dist/example/` 目录下的示例代码。

### 文件结构

客户端（小程序）主要有 images、pages、style、utils 文件夹和 app.js、app.json、app.wxss 文件组成。文件夹主要用途如下：

* images 所有图片都放在此处
* pages 所有页面
* style 样式文件，目前只有 weui.wxss
* utils 工具集

其中 pages 文件夹又根据页面用途分为多个文件夹。首页放在 `pages/index` 文件夹内；资讯的相关页面放在 `pages/news` 文件夹内；个人相关页面放在 `pages/user` 文件夹内；各个功能的页面放在 `pages/service` 文件夹内。每一个页面的四个文件单独放在一个文件夹内，不要将多个页面的文件放在同一文件夹内。

### 全局数据

在 `app.js` 内有几个供全局使用的数据，分别如下：

|           名称           |   类型   |   值    |                    备注                    |
| :--------------------: | :----: | :----: | :--------------------------------------: |
|        version         | String | 小程序版本号 |                    无                     |
|         server         | String | API 地址 |               带协议，不带最后的斜杠                |
|        userInfo        | Object |  用户信息  | openid、nickName、avatarUrl、name、sid 字段必需存在 |
|  schoolInfo.colleges   | Array  |  学院列表  |  前后端保持一致，且禁止修改顺序，因为数据库中保存的是学院在该数组中的索引值   |
| schoolInfo.dormitories | Array  | 宿舍楼列表  |                    同上                    |

> 通过判断 userInfo.openid 是否存在来判断是否已经绑定。

### 全局方法

以下全局方法可以在各个页面内调用，以减少不必要的重复代码。

#### showErrModal()

用于弹窗提示，仅有一个确定按钮，其参数如下：

|   参数名    |    类型    |  必填  |     默认值     |     说明     |
| :------: | :------: | :--: | :---------: | :--------: |
| content  |  String  |  否   | 发生错误，请稍后重试！ |   提示的内容    |
|  title   |  String  |  否   |      无      |   提示的标题    |
| callback | Function |  否   |      无      | 点击确定后的回调函数 |

#### showToast()

用于显示 Toast，其参数如下：

|   参数名    |   类型    |  必填  |   默认值   |            说明             |
| :------: | :-----: | :--: | :-----: | :-----------------------: |
|  title   | String  |  否   |   加载中   |           提示的内容           |
|   icon   | String  |  否   | loading | 图标，只支持“success”和“loading” |
| duration | Number  |  否   |  10000  |           延迟时间            |
|   mask   | Boolean |  否   |  true   |     是否显示透明 蒙层，防止触摸穿透      |

#### sign()

用于计算前后端验证所需的 `key`，仅接收一个 `openid` 作为参数，返回一个包含 `openid`、`timestamp` 和 `key` 三个字段的对象，将其放入请求头中，返回的对象示例如下：

```javascript
{
  openid: "youthol",
  timestamp: "1487858835",
  key: "db2caacba4187f63833f04c2e2aea75d"
}
```

> 实际情况下 `openid` 为 28 位长，此处仅作示例。