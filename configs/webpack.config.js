const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env) => {
    return {
        devtool: 'source-map',
        entry: {
            app: path.join(__dirname, '../src/javascripts/main'),
            vendor: ['react', 'react-dom', 'react-router', 'react-redux']
        },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, '../public/javascripts')
        },

        module: {

            loaders: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true
                    }
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({
                        fallbackLoader: "style-loader",
                        loader: "css-loader!sass-loader"
                    })
                }
            ]
        },


        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: Infinity,
                filename: '[name].js'
            }),
            new ExtractTextPlugin("../stylesheets/styles.css")
        ]
    };
}
