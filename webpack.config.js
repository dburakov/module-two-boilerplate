var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var appPath = path.join(__dirname, 'src');

module.exports = {
    context: appPath,
    resolve: {
        root: appPath
    },
    entry: {
        bundle: 'main.js'
    },
    output: {
        path: './dist/',
        filename: 'bundle.js'
    },
    devServer: {
        host: 'localhost',
        port: '8080'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: [appPath, '/']
            },
            {
                test: /\.(png|jpg|gif|eot|ttf|svg|woff|woff2)$/,
                loaders: ['file'],
                include: [appPath, '/']
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader', 'eslint'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(appPath, 'index.html'),
            minify: false
        })
    ]
};