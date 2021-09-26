### 配置react项目
### 认识babel

使项目支持最原始的jsx文件，让项目支持react的jsx

支持jsx需要额外配置babel去处理jsx文件，将jsx转译成为浏览器可以识别的js

这里我们需要用到如下几个库:

```
- babel-loader
- @babel/core
- @babel/preset-env
- @babel/plugin-transform-runtime
- @babel/preset-react

```



- babel-loader

首先对于我们项目中的jsx文件我们需要通过一个"转译器"将项目中的jsx文件转化成js文件，babel-loader在这里充当的就是这个转译器。

- @babel/core

但是babel-loader仅仅识别出了jsx文件，内部核心转译功能需要@babel/core这个核心库，@babel/core模块就是负责内部核心转译实现的。

- @babel/preset-env

@babel/prest-env是babel转译过程中的一些预设，它负责将一些基础的es 6+语法，比如const/let...转译成为浏览器可以识别的低级别兼容性语法。

`这里需要注意的是@babel/prest-ent并不会对于一些es6+并没有内置一些高版本语法的实现比如`

Promise等polyfill，你可以将它理解为语法层面的转化不包含高级别模块(polyfill)的实现。

- @babel/plugin-transform-runtime

@babel/plugin-transform-runtime,上边我们提到了对于一些高版本内置模块，比如Promise/Generate等等@babel/preset-env并不会转化，所以@babel/plugin-transform-runtime就是帮助我们来实现这样的效果的,他会在我们项目中如果使用到了Promise之类的模块之后去实现一个低版本浏览器的polyfill。

`其实与@babel/plugin-transform-runtime达到相同的效果还可以直接安装引入@babel/polyfill，不过相比之下这种方式不被推荐，他存在污染全局作用域，全量引入造成提及过大以及模块之间重复注入等缺点。`

此时这几个插件我们已经可以实现将es6+代码进行编译成为浏览器可以识别的低版本兼容性良好的js代码了，不过我们还缺少最重要一点。

目前这些插件处理的都是js文件，我们得让她能够识别并处理jsx文件。

- @babel/preset-react

最终我们希望将.jsx文件转化为js文件同时将jsx标签转化为React.createElement的形式，此时我们就需要额外使用babel的另一个插件-@babel/preset-react。

@babel/preset-react是一组预设，所谓预设就是内置了一系列babel plugin去转化jsx代码成为我们想要的js代码。

```sh
yarn add -D @babel/core @babel/preset-env babel-loader @babel/plugin-transform-runtime @babel/preset-react 

```

创建一个基础的webpack.config.js来使用它来转译我们的jsx文件


```js
// scripts/webpack.base.js
const path = require('path');

module.exports = {
  // 入口文件，这里之后会着重强调
  entry: {
    main: path.resolve(__dirname, '../src/packages/home/index.jsx'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
    ],
  },
};

```
- .babelrc

babel-loader仅仅是一个桥梁，真正需要转译作用的其他的插件
```js
// .babelrc
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]

}

```

### 配置TypeScript

babel内置了一组预设去转译TypeScript代码 --@babel/preset-typescript。
接下来让我们来使用@babel/preset-typescript预设来支持TypeScript语法吧。

```sh
npm install --save-dev @babel/preset-typescript
```

修改之前.babelrc配置文件，让babel支持转译的ts文件

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
+   "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
}


```


#### webpack支持ts/tsx文件

不要忘记同时修改我们的webpack中babel-loader的匹配规则

```js
// webpack.base.jf
const path = require('path');

module.exports = {
  // 入口文件，这里之后会着重强调
  entry: {
    // 这里修改`jsx`为`tsx`
    main: path.resolve(__dirname, '../src/packages/home/index.tsx'),
  },
  module: {
    rules: [
      {
        // 同时认识ts jsx js tsx 文件
        test: /\.(t|s)x?$/,
        use: 'babel-loader',
      },
    ],
  },
};

```

#### 初始化tsconfig.json

项目中已经可以支持tsx文件的编写，同时也支持编译ts文件为低版本js文件了。

在使用Ts时，通常我们需要配置typescript的配置文件，没错就是tsconfig.json

项目内安装Ts:

```sh
yarn add -D typescript
```

调用tsc --init命令初始化tsconfig.json:

```sh
npx tsc --init

```

#### 配置tsconfig.json
首先我们来找到对应的jsx选项:
```js
//  "jsx": "preserve",
```

他的作用是指定jsx的生成什么样的代码，简单来说也就是jsx代码将被转化成为什么。
这里我们将它修改为react。
```js
 "jsx": "react",
```
接下来我们来修改一下ts中的模块解析规则，将它修改为node:
"moduleResolution": "node",
```js
"moduleResolution": "node",
```

### 处理报错
我们已经在项目中完美支持了typescript


首先我们引用第三方包在TypeScript文件时，简单来说它会寻找对应包的package.json中的type字段查找对应的类型定义文件。

react和react-dom这两个包代码中都不存在对应的类型声明，所以我们需要单独安装他们对应的类型声明文件:

```sh
yarn add -D @types/react-dom @types/react
```

此时我们的项目已经可以完成支持typescript和react了


### webpack配置静态资源支持

`资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：`

- asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
- asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
- asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
- asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。

当在 webpack 5 中使用旧的 assets loader（如 file-loader/url-loader/raw-loader 等）和 asset 模块时，你可能想停止当前 asset 模块的处理，并再次启动处理，这可能会导致 asset 重复，你可以通过将 asset 模块的类型设置为 'javascript/auto' 来解决。



```js
const path = require('path');

module.exports = {
  // 入口文件，这里之后会着重强调
  entry: {
    main: path.resolve(__dirname, '../src/packages/home/index.tsx'),
  },
  module: {
    rules: [
      {
        // 同时认识ts jsx js tsx 文件
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type:'asset/inline'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
};

```

### 别名统一

```js
// webpack.base.js
const path = require('path');

module.exports = {
  // 入口文件，这里之后会着重强调
  entry: {
    main: path.resolve(__dirname, '../src/packages/home/index.tsx'),
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@packages': path.resolve(__dirname, '../src/packages'),
      '@containers': path.resolve(__dirname, '../src/containers'),
    },
    mainFiles: ['index', 'main'],
    extensions: ['.ts', '.tsx', '.scss', 'json', '.js'],
  },
  module: {
    rules: [
      {
        // 同时认识ts jsx js tsx 文件
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/inline'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
};

```

这里我们添加了resolve的参数，配置了别名@src,@package,@container。

以及当我们不书写文件后缀时，默认的解析规则extensions规则。

同时还配置了mainFiles，解析文件夹路径～

### 修改tsconfig.json别名配置

我们来修改tsconfig.json，让ts同步支持引入:
```js
    // tsconfig.json
    ...
     "baseUrl": "./",
    /* Specify the base directory to resolve non-relative module names. */
    "paths": {
      "@src/*": ["./src/*"],
      "@packages/*": ["./src/packages/*"],
      "@containers/*": ["./src/containers/*"],
    },

```
如果要配置paths那么一定是要配置baseUrl的，所谓baseUrl就是我们的paths是相对于那个路径开始的。

所以我们在paths中添加对应的别名路径就可以完成配置，让ts也可以合理解析出我们的类型别名。

### 配置css/sass

这里用到的loader如下:
```
sass-loader
resolve-url-loader
postcss-loader
css-loader
MiniCssExtractPlugin.loader
```

- sass-loader
针对于sass文件我们首先一定是要使用sass编译成为css的，所以我们首先需要对.scss结尾的文件进行编译成为css文件。

这里我们需要安装:
```sh
yarn add -D sass-loader sass 

```

sass-loader的作用就类似我们之前讲到过的babel-loader，可以将它理解成为一个桥梁，sass转译成为css的核心是由node-sass或者dart-sass去进行编译工作的

- resolve-url-loader

针对于sass编译后的css文件中的路径是不正确的，并不是我们想要的相对路径模式

```sh
yarn add -D resolve-url-loader
```

- postcss-loader
使用postcss-loader处理生成的css

```sh
yarn add -D postcss-loader postcss

```

在项目根目录下新建一个postcss.config.js的文件:

```js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
}

```

这里我们使用到了两个postcss的插件:

- autoprefixer插件的作用是为我们的css内容添加浏览器厂商前缀兼容。
- cssnano的作用是尽可能小的压缩我们的css代码。

接下来我们去安装这两个插件:
```sh
yarn add -D cssnano autoprefixer@latest

```

- css-loader
css-loader是解析我们css文件中的@import/require语句分析的.

```sh
yarn add -D css-loader

```

- MiniCssExtractPlugin.loader

这个插件将 CSS 提取到单独的文件中。它为每个包含CSS 的 JS 文件创建一个 CSS 文件。它支持按需加载 CSS 和 SourceMaps。

style-loader会将生成的css添加到html的header标签内形成内敛样式，这显然不是我们想要的。所以这里我们使用MiniCssExtractPlugin.loader的作用就是拆分生成的css成为独立的css文件。


```sh
yarn add -D mini-css-extract-plugin
```

### 配置html页面
让我们来使用一下这个插件:

```sh
yarn add --dev html-webpack-plugin

```

在项目根目录下创建一个public/index.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div id='root'></div>
</body>

</html>

```

```js
// webpack.base.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口文件，这里之后会着重强调
  entry: {
    main: path.resolve(__dirname, '../src/packages/home/index.tsx'),
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@packages': path.resolve(__dirname, '../src/packages'),
      '@containers': path.resolve(__dirname, '../src/containers'),
    },
    mainFiles: ['index', 'main'],
    extensions: ['.ts', '.tsx', '.scss', 'json', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              keepQuery: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    // 生成html名称为index.html
    // 生成使用的模板为public/index.html
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
};

```

此时，当我们再次运行yarn build时，我们生成的dist目录下会多出一个html文件，这个html文件会注入我们打包生成后的的js和css内容。

### 配置开发环境预览

在scripts目录下新建一个webpack.dev.js文件，表示专门用于开发环境下的打包预览:

虽然devServer已经内置了hot:true达到热重载，但是我们仍然需要安装webpack-dev-server。

```js
// webpack.dev.js
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path');

const devConfig = {
  mode: 'development',
  devServer: {
    // static允许我们在DevServer下访问该目录的静态资源
    // 简单理解来说 当我们启动DevServer时相当于启动了一个本地服务器
    // 这个服务器会同时以static-directory目录作为跟路径启动
    // 这样的话就可以访问到static/directory下的资源了
    static: {
      directory: path.join(__dirname, '../public'),
    },
    // 默认为true
    hot: true,
    // 是否开启代码压缩
    compress: true,
    // 启动的端口
    port: 9000,
  },
};

module.exports = merge(devConfig, baseConfig);

```
这里需要提到的是webpack-merge这个插件是基于webpack配置合并的，这里我们基于webpack.base.js和webpack.dev.js合并导出了一个配置对象。

接下里再让我们修改一下pacakge.json下的scripts命令。


```json
...
 "scripts": {
+   "dev": "webpack serve --config ./scripts/webpack.dev.js",
    "build": "webpack --config ./scripts/webpack.base.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
...

```

### 切入多页面应用

`拆分js`

所谓基于webpack实现多页面应用，简单来将就是基于多个entry，将js代码分为多个entry入口文件。

比如我在src/packages/editor新建一个入口文件index.tsx，同时修改webpack中的entry配置为两个入口文件，webpack就会基于入口文件的个数自动进行不同chunk之间的拆分。

`简单来说就是webapck会基于入口文件去拆分生成的js代码成为一个一个chunk。`

`拆分html`

拆分出来的js还是在同一个index.html中进行引入，我们想要达到的效果是main.js在main.html中引入成为一个页面。
editor.js在editor.html中引入成为一个单独的页面。
要实现这种功能，我们需要在html-webpack-plugin上做手脚。

现在我们打包生成了两份js文件分别是editor.js和main.js，现在我们想生成两份单独的html文件，两个html文件中分别引入不同的editor.js和main.js。


此时我们每次打包只需要调用两次htmlWebpackPlugin，一份包含editor这个chunk，一份包含main这个chunk不就可以了

### 工程化原理
```
- 每次打包通过node脚本去执行打包命令。
- 每次打包通过命令行交互命令，读取pacakges下的目录让用户选择需要打包的页面。
- 当用户选中对应需要打包的目录后，通过环境变量注入的方式动态进行打包不同的页面。
```

- `execa`

这个库改进了node的源生模块child_process,用于开启一个node子进程。

- `inquirer`

inquirer提供一些列api用于nodejs中和命令行的交互。

- `chalk`

chalk为我们的打印带上丰富的颜色.

```sh
yarn add -D chalk inquirer execa      

```

实现代码
首先让我们在scripts下创建一个utils的文件夹。

utils/constant.js
constant.js中存放我们关于调用脚本声明的一些常量:

```js
// 规定固定的入口文件名 packages/**/index.tsx
const MAIN_FILE = 'index.tsx'
const chalk = require('chalk')

// 打印时颜色
const error = chalk.bold.red
const warning = chalk.hex('#FFA500')
const success = chalk.green

const maps = {
  success,
  warning,
  error,
}

// 因为环境变量的注入是通过字符串方式进行注入的
// 所以当 打包多个文件时 我们通过*进行连接 比如 home和editor 注入的环境变量为home*editor
// 注入多个包环境变量时的分隔符
const separator = '*'


const log = (message, types) => {
  console.log(maps[types](message))
}

module.exports = {
  MAIN_FILE,
  log,
  separator,
  BASE_PORT,
}

```

utils/helper.js
```js
const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { MAIN_FILE } = require('./constant')

// 获取多页面入口文件夹中的路径
const dirPath = path.resolve(__dirname, '../../src/packages')

// 用于保存入口文件的Map对象
const entry = Object.create(null)

// 读取dirPath中的文件夹个数
// 同时保存到entry中  key为文件夹名称 value为文件夹路径
fs.readdirSync(dirPath).filter(file => {
  const entryPath = path.join(dirPath, file)
  if (fs.statSync(entryPath)) {
    entry[file] = path.join(entryPath, MAIN_FILE)
  }
})

// 根据入口文件list生成对应的htmlWebpackPlugin
// 同时返回对应wepback需要的入口和htmlWebpackPlugin
const getEntryTemplate = packages => {
  const entry = Object.create(null)
  const htmlPlugins = []
  packages.forEach(packageName => {
    entry[packageName] = path.join(dirPath, packageName, MAIN_FILE)
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../../public/index.html'),
        filename: `${packageName}.html`,
        chunks: ['manifest', 'vendors', packageName],
      })
    )
  })
  return { entry, htmlPlugins }
}

module.exports = {
  entry,
  getEntryTemplate,
}

```

helper.js中其实主要导出的getEntryTemplate方法，这个方法输入一个package的数组，同时返回对应webpack需要的entry和html-wepback-plugin组成的数组

utils/dev.js

- 首先动态读取packages下的目录，获取当前项目下所有的页面文件。
- 通过命令交互罗列当前所有页面，提供给用户选择。
- 用户选中后，通过execa调用webpack命令同时注入环境变量进行根据用户选中内容打包。

```js
const inquirer = require('inquirer')

const execa = require('execa')
const { log, separator } = require('./constant')
const { entry } = require('./helper')

// 获取packages下的所有文件
const packagesList = [...Object.keys(entry)]

// 至少保证一个
if (!packagesList.length) {
  log('不合法目录，请检查src/packages/*/main.tsx', 'warning')
  return
}

// 同时添加一个全选
const allPackagesList = [...packagesList, 'all']

// 调用inquirer和用户交互
inquirer
  .prompt([
    {
      type: 'checkbox',
      message: '请选择需要启动的项目:',
      name: 'devLists',
      choices: allPackagesList, // 选项
      // 校验最少选中一个
      validate(value) {
        return !value.length ? new Error('至少选择一个项目进行启动') : true
      },
      // 当选中all选项时候 返回所有packagesList这个数组
      filter(value) {
        if (value.includes('all')) {
          return packagesList
        }
        return value
      },
    },
  ])
  .then(res => {
    const message = `当前选中Package: ${res.devLists.join(' , ')}`
    // 控制台输入提示用户当前选中的包
    log(message, 'success')
    runParallel(res.devLists)
  })

// 调用打包命令
async function runParallel(packages) {
  // 当前所有入口文件
  const message = `开始启动: ${packages.join('-')}`
  log(message, 'success')
  log('\nplease waiting some times...', 'success')
  await build(packages)
}

// 真正打包函数
async function build(buildLists) {
  // 将选中的包通过separator分割
  const stringLists = buildLists.join(separator)
  // 调用通过execa调用webapck命令
  // 同时注意路径是相对 执行node命令的cwd的路径 
  // 这里我们最终会在package.json中用node来执行这个脚本
  await execa('webpack', ['server', '--config', './scripts/webpack.dev.js'], {
    stdio: 'inherit',
    env: {
      packages: stringLists,
    },
  })
}

```
通过命令行和用户交互获得用户想要启动的项目之后通过用户选中的packages然后通过execa执行webpack命令同时动态注入一个环境变量

修改webpack.base.js
```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { separator } = require('./utils/constant')
const { getEntryTemplate } = require('./utils/helper')

// 将packages拆分成为数组 ['editor','home']
const packages = process.env.packages.split(separator)

// 调用getEntryTemplate 获得对应的entry和htmlPlugins
const { entry, htmlPlugins } = getEntryTemplate(packages)

module.exports = {
  // 动态替换entry
  entry,
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@packages': path.resolve(__dirname, '../src/packages'),
      '@containers': path.resolve(__dirname, '../src/containers'),
    },
    mainFiles: ['index', 'main'],
    extensions: ['.ts', '.tsx', '.scss', 'json', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              keepQuery: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    // 同时动态生成对应的htmlPlugins
    ...htmlPlugins
  ],
};


```
修改package.json

```sh
 "scripts": {
 -  "dev": "webpack serve --config ./scripts/webpack.dev.js",
 +  "dev": "node ./scripts/utils/dev.js",
    "build": "webpack --config ./scripts/webpack.base.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

```



以上为个人的学习笔记
#### 参考链接
[了解详细内容：webpack + react + ts + 多页面应用搭建](https://juejin.cn/post/7011128931533193230?utm_source=gold_browser_extension)
