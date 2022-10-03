// merge allows us to take all the config inside common file and merge it
// with configuration inside development file.
const {merge} = require('webpack-merge');
// takes some kind of HTML file inside of project and inject a couple of different scrip ttags inside of it
const HtmlWebpackPlugin = require('html-webpack-plugin');
// to take our dev config and merge together with config inside common file we want to merge it later using merge.
const commonConfig = require('./webpack.common');
const packageJSON = require('../package.json');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');



const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            shared: packageJSON.dependencies
        })
        ,new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
};
// listing dev config second, means that the dev config is going ot override similar config assigned to common config.
module.exports = merge(commonConfig, devConfig);