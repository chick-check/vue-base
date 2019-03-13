1. npm init 的时候会产生 package.json; 安装 webpack 会有package-lock.json
2. index.html不导入第三方包，第三方包依赖 main.js 
3. es6语法比较高级，浏览器不支持，可以通过 webpack 处理
```
webpack .\src\main.js .\dist\bundle.js
```
4. webpack-dev-server 工具，来实现自动打包编译的功能 `npm i webpack-dev-server -D` 项目里安装，不能把webpack-dev-server 当成脚本命令使用，在package.json 配置后执行 `npm run dev`，实现热更新
5. html-webpack-plugin  的作用：自动在内存中生成指定页面；把打包好的 boundle.js 追加到页面中