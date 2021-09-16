### node 核心模块-文件路径 path模块

在做webpack配置时候多次用到路径相关内容

### node中的路径分类
`node`中的路径大致分为5类， `dirname`, `filename`,`process.cwd()`, `./`, `../`, 其中`dirname`, `filename`,`process.cwd()`为绝对路径

文件目录结构如下：

```
代码pra/
  - node核心API/
      - fs.js
      - path.js

```

path.js 中的代码

```js
const path = require('path')
console.log(__dirname)
console.log(__filename)
console.log(process.cwd())
console.log(path.resolve('./'))

```

### 路径知识总结

* __dirname： 获得当前执行文件所在目录的完整目录名 
* __filename： 获得当前执行文件的带有完整绝对路径的文件名 
* process.cwd()：获得当前执行` node` 命令时候的文件夹目录名 
* ./： 不使用 `require` 时候，`./`与`process.cwd()`一样，使用`require`时候，与`__dirname`一样 

只有在 `require() `时才使用相对路径(./, ../) 的写法，其他地方一律使用绝对路径，如下：

```js
// 当前目录下
path.dirname(__filename) + '/path.js'
// 相邻目录下
path.resolve(__dirname, '../regx/regx.js')

```

### path 
```sh
这是 api 官网地址:https://nodejs.org/api/path.html
```

掌握一些在 `webpack` 等工程配置的时候经常用到的`api`

#### path.normalize

作用： 规范化路径，把不规范的路径规范化。

```js
const path = require('path')

console.log(path.normalize('/a/b//c//d/..'))

```

规范后的结果

```
/a/b/c/d
```

#### path.join
```text
path.join([...paths])
```
作用：

* 1.传入的参数是字符串的路径片段，可以是一个，也可以是多个
* 2. 返回的是一个拼接好的路径，但是根据平台的不同，他会对路径进行不同的规范化，举个例子，`Unix`系统是/，`Windows`系统是\，那么你在两个系统下看到的返回结果就不一样。 
* 3.如果返回的路径字符串长度为零，那么他会返回一个.，代表当前的文件夹。
* 4.如果传入的参数中有不是字符串的，那就直接会报错 


```js 
const path = require('path')
console.log(path.join('src', 'task.js'))

const path = require('path')
console.log(path.join(''))

```

转化后的结果

```js
src/task.js
.

```

### path.parse

作用：
```
他返回的是一个对象，那么我们来把这么几个名词熟悉一下：
root：代表根目录
dir：代表文件所在的文件夹
base：代表整一个文件
name：代表文件名
ext: 代表文件的后缀名
```

```js
const path = require('path')
console.log(path.parse('/a/b/c/d/e'))

```

转化后
```
{ root: '/',
  dir: '/a/b/c/d',
  base: 'e',
  ext: '',
  name: 'e'
}

```

### path.basename

作用：
 basename 接收两个参数，第一个是`path`，第二个是`ext`(可选参数)，当输入第二个参数的时候，打印结果不出现后缀名

```js
const path = require('path')
console.log(path.basename('/a/b/c/d/e'))
console.log(
  path.basename(
    '/a/b/c/d/e/path.js',
    '.js'
  )
)

```

结果
```
e
path
```

#### path.dirname 

作用总结:
返回文件的目录完整地址 

举例说明 

```js
const path = require('path')
console.log(path.dirname('/a/b/c/d/node核心API'))
```
运行结果

```
/  a/ b / c / d
```
### path.extname 

作用:
返回的是后缀名，但是最后两种情况返回''

举例说明 

```js
const path = require('path')
path.extname('index.html')
path.extname('index.coffee.md')
path.extname('index.')
path.extname('index')
path.extname('.index')
```
运行结果

```
 .html
.md
.
''
''
```
### path.resolve 

作用总结:
p`ath.resolve([...paths]) path.resolve` 就相当于是 `shell `下面的cd操作，从左到右运行一遍`cd path`命令，最终获取的绝对路径/文件名，这个接口所返回的结果了。但是`resolve`操作和`cd`操作还是有区别的，`resolve`的路径可以没有，而且最后进入的可以是文件。
举例说明 

```
cd /foo/bar/    //这是第一步, 现在的位置是/foo/bar/
cd /bar/faa     //这是第二步，这里和第一步有区别，他是从/进入的，也就时候根目录，现在的位置是/bar/faa
cd ..       //第三步，从faa退出来，现在的位置是 /bar
cd a/../c   //第四步，进入a，然后在推出，在进入c，最后位置是/bar/c

```

```js
const path = require('path')
console.log(path.resolve('/foo/bar', '/bar/faa', '..', 'a/../c'))
```

输出结果

```
 ;/bar/c
```

### path.relative 

举例说明

```js
const path = require('path')

console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'))

console.log(path.relative('/data/demo', '/data/demo'))

```
运行结果
```
 ../../impl/bbb
 ""
```
  
 作用:
 `path.relative(from, to) `
 - 描述：从 `from `路径，到 `to `路径的相对路径。 
 - 边界： 如果 `from、to` 指向同个路径，那么，返回空字符串。 如果 `from、to `中任一者为空，那么，返回当前工作路径。 