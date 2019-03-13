const path = require('path');

module.exports = {
    mode: 'development', // webpack 4 要求加这个表示开发环境
    entry:'./src/main.js', //需要打包的文件路径
    output:{
        path:path.resolve(__dirname,'./dist'), //输出的文件路径
        filename:'bundle.js' //输出的文件名
    },
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
}