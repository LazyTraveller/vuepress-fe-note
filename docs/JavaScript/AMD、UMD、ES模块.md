### AMD、UMD、ES……模块

#### commonJS
一个文件是一个模块
引入 require
暴露 module.exports exports.xxxx。module 是模块本身，exports 是他的变量。注意不能 module.exports = xxxx

主要用于服务端 Node
加载模块是同步的

#### AMD
暴露
```js
define(['a', 'b'], function(a, b){
})

引入
require(['a', 'b'], function(a, b){
})
```

运行于 浏览器上

#### UMD
可以同时运行在 Node 和 浏览器上
现在库打包基本都是使用 UMD 规范

### ES6
export import
语法是静态的
import 会自动提到代码顶层



#### CommonJS 和 ES6 的区别
差别
- CommonJS 模块输出的是一个值的拷贝，ES6 Module 输出的是值的引用
- Common 是单个导出， ES6 Module 可以导出多个
- CommonJS 模块是运行时加载，ES6 Module 是编译时输出接口。

对于第二个，commonjs 运行时生成。ES6 Module 是解析生成