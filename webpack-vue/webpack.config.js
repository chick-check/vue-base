var path = require('path')

// 向外暴露一个配置对象
module.exports = {
    entry:path.join(__dirname, './src/main.js'), //表示需要webpack 打包的文件
    output:{
        path:path.join(__dirname, './dist'), // 打包好的文件放哪里
        filename:'bundle.js' //指定输出文件的名称
    },
    plugins:[
        //所有插件的配置节点
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'), //指定模板路径
            filename:'index.html' //设置生成的内存页面名称
        })
    ],

    module:{
        //用于配置所有第三方加载器,test 正则表达式匹配，使用的第三方加载器
        //rules 里的 use 从右到左执行，执行完后交给 webpack 进行打包合并，输出到 bundle.js 中
        rules:[
            {test: /\.css$/, use: ['style-loader', 'css-loader']} , 
            {test:/\.less$/, use: ['style-loader', 'css-loader','less-loader']},
            {test:/\.scss$/, use: ['style-loader', 'css-loader','less-loader','sass-loader']},
            {test:/\.(jpg|png|gif|bmp|jpeg)$/, use:'url-loader?limit=7632&name=[hash:8]-[name].[ext]'}, //webpack 的 css 不能处理 url ,包括图片和字体，所以需要第三方加载器。limit 给定图片大小，单位 byte,如果引入的图片大于等于limit值，不会转化成 base64;name 表示名字和后缀不进行哈希转换，和原来的保持一致;可是hash 保证的图片重名也不会有错，所以还是需要的，可以截取前8位hash值
            {test:/\.(ttf|eot|svg|woff|woff2)$/, use:'url-loader'},
            {test:/\.js$/, use:'babel-loader', exclude:/node_modules/}, //只要转换自己写的 js 文件，需要排除node_modules 里的 js 文件 ，1、不排除 babel 会把node_modules 中所有第三方js 文件都打包编译，非常消耗 CPU；再次，就算都打包好了，项目也无法正常进行
            {test:'\.js$', use:'babel-loader', exclude:/node_modules/} //Babel 转换高级的es6 语法
        ]
    },
    resolve:{
        alias:{
            "vue$":"vue/dist/vue.js"
        }
    }

}