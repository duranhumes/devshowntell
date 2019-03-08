require('dotenv-safe/config')

const { smart } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const webpackBase = require('./base')
const { basePath, buildPath, entryPath } = require('./paths')

module.exports = smart(webpackBase, {
    entry: entryPath,
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: buildPath,
        filename: 'bundle.[hash].min.js',
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: false,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    warnings: false,
                    mangle: true,
                    module: false,
                    keep_fnames: false,
                },
            }),
        ],
    },
    plugins: [
        new OptimizeCssAssetsPlugin(),
        new CleanWebpackPlugin({
            dry: false,
            exclude: [],
            verbose: false,
            root: basePath,
            cleanStaleWebpackAssets: true,
        }),
    ],
})
