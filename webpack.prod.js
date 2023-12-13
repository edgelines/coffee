const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin') //추가
const common = require('./webpack.common.js');


module.exports = merge(common, {
    mode: "production",
    devtool: "hidden-source-map",
    output: {
        path: path.resolve('D:/CheckMate/FastAPI/web/coffee'),
        filename: 'build.js',
        publicPath: '/', // 라우터 링크 못읽는 현상 수정
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),  // index.html 파일의 경로를 지정합니다.
            favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
            inject: true,
            filename: path.resolve('D:/CheckMate/FastAPI/web/coffee/index.html')
        }),
    ],
});