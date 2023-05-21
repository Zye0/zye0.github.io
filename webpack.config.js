const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name][contenthash].js',
        clean: true
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, './dist')
        },
        hot: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Website',
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
}