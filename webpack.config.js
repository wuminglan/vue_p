

const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');

// 导出一个配置对象，webpack在启动时会根据配置内容进行打包
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'buld.js'
    },

    // 文件额外处理插件配置
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],

    module: {
        // 默认webpack只支持js模块打包，通过这里的loader配置让webpack能够把更多类型的文件转成js模块打包
        rules: [

            // css，先打包为js模块。然后自动执行生效
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },

            // // less，先解析，然后打包为js模块。然后自动执行生效
            // {
            //     test: /\.less$/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'less-loader'
            //     ]
            // },

            // // sass，先解析，然后打包为js模块。然后自动执行生效
            // {
            //     test: /\.(scss|sass)$/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'sass-loader'
            //     ]
            // },

            // html，把模版变成js模版导出字符串
            {
                test: /\.tpl$/,
                use: [
                    'html-loader'
                ]
            },

            // 图片，先压缩，然后打包成js模块，其中小图片会转成base64，大图片仍然为url引用
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    // 大约小于10kb的图片变成base64编码继承到js中，比较大的图片仍然以url方式引入
                    { loader: 'url-loader', options: { limit: 10000 } },
                    'image-webpack-loader'
                ]
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015'],
                            plugins: ['transform-runtime']
                        },
                        
                    }
                ]
            },

            // 配置vue文件的解析转换
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            }
             
        ]
    }
};