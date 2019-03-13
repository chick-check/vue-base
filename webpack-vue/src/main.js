// 在webpack 中导入的vue构造函数， 功能不全，只是提供了 runtime-only 的方式，没有提供像网页中那样的使用方式
//node_modules/vue/pack.json 里的 main 属性指定了这个包被加载时候的入口文件是：dist/vue.runtime.common.js
//要改成 vue.js
//import Vue from 'vue'
import Vue from '../node_modules/vue/dist/vue.js'

//第二种方法：
//import Vue from 'vue'
// 在config.js 里配置 resolve 对象，指定 vue 指向的路径

var vm = new Vue({
    el:'#app',
    date:{
        msg:'123'
    }
})