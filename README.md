# LOOK 小程序练习

### 需求

- 四个模块（已完成）
- 专题列表加载（使用 scroll-view 实现）

### 额外

- 引入 underscore.js，挂载在 wx._ 下（已完成）
- 改造 Page 的钩子函数 onLoad，使得在每个页面初始化之前，输出一句话：console.log('Hack PageOnLoad')（已完成）
- 思考小程序有没有 cookie，如果没有请实现一个，挂载在 wx 下，提供 wx.setCookie 和 wx.getCookie 接口（已完成）

### 注意事项

- setData 数据不能过大（已解决）

  > setData 数据的限制是：1024 * 1024 = 1048576 字节，也就是 1M。

  > 使用路径方式设置数据 this.setData({ 'a[0]': {...} })。

- 五层路由嵌套问题（单个页面没有跳转）

  > 如果嵌套路由层数超过五层，路由将无法继续使用 navigator 的方式继续跳转。小程序不管理路由，需要开发者自己管理。

- scroll-view 固定高度问题（已解决）

  > 只有把 scroll-vew 的高度设置一个固定的值，才能使用它提供的钩子函数。

  > 不使用 scroll-view 而使用页面本身的钩子函数 onReachBottom 的话，在 IPhone 手机上会有页面随着手指触摸左右浮动的情况。

- 模板消息 pushid 采集（不是很理解什么意思）

  > 可以通过某些比较 trick 的途径手机模板消息的 id，来绕过消息通知的限制问题。

- 模板开发（组件化失败）

  > 分离 wxml 模板的同时，也分离 js 逻辑代码。