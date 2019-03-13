## webpack 构建说明
1. 创建项目目录
- test
  - dist
  - src
    - css
    - js
    - images
    - main.js
    - index.html

2. 初始化项目 `npm init -y` ,会生成 package.json 文件
3. 安装 webpack 和 webpack-cli(用于在命令行执行 webpack) `npm install webpack webpack-cli --save-dev`; 当前版本：webpack@4.29.6 / webpack-cli@3.2.3 生成package-lock.json 和 node_modules
4. 编写 index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <script src = "./main.js"></script>
</body>
</html>
```
5. 编写 webpack 配置文件 webpack.config.js，先根目录添加，在编写。
```javascript
const path = require('path');

module.exports = {
    mode: 'development', // webpack 4 要求加这个表示开发环境
    entry:'./src/main.js', //需要打包的文件路径
    output:{
        path:path.resolve(__dirname,'./dist'), //输出的文件路径
        filename:'bundle.js' //输出的文件名
    }
}
```
6. webpack 默认只处理 js 文件，无法处理其他非 js 文件；此时需要手动安装第三方 loader 加载器; 
`npm install -g cnpm --registry=https://registry.npm.taobao.org`
`cnpm i style-loader css-loader -D`
之后在配置文件里配置
```javascript
  module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.scss/,
                use:['style-loader','css-loader','sass-loader']
            },
            { /*
                //webpack 的 css 不能处理 url ,包括图片和字体，所以需要第三方加载器。limit 给定图片大小，单位 byte,
                  如果引入的图片大于等于limit值，不会转化成 base64;name 表示名字和后缀不进行哈希转换，和原来的保持一致;
                  可是hash 保证的图片重名也不会有错，所以还是需要的，可以截取前8位hash值
                */
                test:/\.(jpg|png|gif|bmp|jpeg)$/, 
                use:'url-loader?limit=7632&name=[hash:8]-[name].[ext]'
            },
            {
                test:/\.(ttf|eot|svg|woff|woff2)$/, 
                use:'url-loader'
            },
            {
                test:/\.js$/,
                use:'babel-loader',
                exclude:/node_modules/ //仅转换自己写的 js 文件，排除 node_modules 里的 js 文件
            }
        ]
    } 
```
7. webpack ,默认只能处理部分 es6新语法，此时需要借助 第三方 loader 帮助处理成低级语法，之后把结果交给 webpack 打包给 bundle.js
- `cnpm i babel-core babel-loader babel-plugin-transform-runtime -D` 
- `cnpm i babel-preset-env babel-preset-stage-0 -D`
- 之后在 webpack 配置文件 module 节点 rules 数组中，添加新的匹配规则在项目根目录，新建 .babelrc 的 Babel 的配置文件，这个配置文件是 json 格式，不能写注释，字符串必须用双引号。【语法】【插件】 是不含 babel-loader 和 babel-preset 的后面部分。
```json
{
    "plugins": ["transform-runtime"],
    "presets": ["env","stage-0"]
}
```

8. package.json scripts属性上配置"dev": "webpack-dev-server"，之后可以直接执行`npm run dev` 执行 webpack-dev-server