// merge allows us to take all the config inside common file and merge it
// with configuration inside development file.
const {merge} = require('webpack-merge');
// to take our dev config and merge together with config inside common file we want to merge it later using merge.
const commonConfig = require('./webpack.common');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJSON = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8080/',
    },
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    plugins: [
        new ModuleFederationPlugin({
           name: 'container',
           remotes: {
               marketing: 'marketing@http://localhost:8081/remoteEntry.js'
           },
            shared: packageJSON.dependencies
        })
    ],
};
// listing dev config second, means that the dev config is going ot override similar config assigned to common config.
module.exports = merge(commonConfig, devConfig);