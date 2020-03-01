const path = require ('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve (__dirname, 'src', 'index.jsx') //'./src/index.jsx
    },  
    output: {
        path: path.join (__dirname, 'dist'),
        publicPath: '',
        filename: 'js/bundle.js'
    },
    mode: 'development', //'production'
    // mode: 'production',
    devServer: {
        contentBase: './dist',
        port: 3000,
        hot: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: [
                        [
                            "@babel/plugin-proposal-class-properties", {"loose": true}
                        ]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../', //?
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                  'css-loader',
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'css/[name].css',
          chunkFilename: '[id].css',
          ignoreOrder: false,
        }),
        new HtmlWebpackPlugin({ 
            filename: './index.html',
            //template: 'src/index.html'
            template : path.resolve(__dirname,'src', 'index.html')
          })
      ]
}