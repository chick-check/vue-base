//这是ES6中导入模块的方式,可是ES6 代码比较高级，浏览器不识别
//从 node_module 获取 jquery 包给 $
import $ from 'jquery'
// const $ = require('jquery')

import './css/index.css'
//webpack 默认只处理 js 文件，无法处理其他非 js 文件；此时需要手动安装第三方 loader 加载器
//1、 cnpm i style-loader css-loader -D
//2、在webpack.config.js 这个对象 新增一个配置节点， module对象，这个对象上有个rules属性，是个数组，这个数组中存放所有第三方文件的匹配和处理规则


//不用写 node_modules 这一层，默认回去 node_modules 中查找
import 'bootstrap/dist/css/bootstrp.css'

// class 是es6提供的新语法， 用来实现 es6 中的面向对象编程
//static 定义静态属性，可以直接通过类名访问属性
// 通过类的实例访问的属性，叫实例属性
// webpack ,默认只能处理部分 es6新语法，此时需要借助 第三方 loader 帮助处理成低级语法，之后把结果交给 webpack 打包给 bundle.js
// Babel 高级转低级，可以运行两套包，缺一不可，分别用来转换和确定转换的语法，安装 Babel 相关 loader 功能：
// cnpm i babel-core babel-loader babel-plugin-transform-runtime -D
// cnpm i babel-preset-env babel-preset-stage-0 -D
// 之后在 webpack 配置文件 module 节点 rules 数组中，添加新的匹配规则
// 在项目根目录，新建 .babelrc 的 Babel 的配置文件，这个配置文件是 json 格式，不能写注释，字符串必须用双引号。
// 【语法】【插件】 是不含 babel-loader 和 babel-preset 的后面部分
class Person{
    static info = {name:'zs', age:20} 
}

//访问 Person 类身上的 info 静态属性
console.log(Person.info)

$(function(){
    $('li:odd').css('backgroundColor','lightblue')
    $('li:even').css('backgroundColor',function(){
        return '#'+'D97634'
    })
})