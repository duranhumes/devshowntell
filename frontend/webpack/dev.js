require('dotenv-safe/config')

const { smart } = require('webpack-merge')
const { NamedModulesPlugin } = require('webpack')

const webpackBase = require('./base')
const { buildPath, entryPath } = require('./paths')

const devPort = process.env.APP_PORT

module.exports = smart(webpackBase, {
    output: {
        path: buildPath,
    },
    devServer: {
        hot: false,
        open: true,
        inline: true,
        port: devPort,
        compress: true,
        publicPath: '/',
        historyApiFallback: true,
    },
    devtool: undefined,
    mode: 'development',
    plugins: [new NamedModulesPlugin()],
    entry: [`webpack-dev-server/client?http://localhost:${devPort}`, entryPath],
})
