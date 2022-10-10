const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
//eventually weBpack can take care of package shared functions for us
const packageJson = require('../package.json');

//defined when we build CI/CD pipeline.
const domain = process.env.PRODUCTION_DOMAIN;
//contenthash for caching issues
const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
        })
    ],
};

module.exports = merge(commonConfig, prodConfig);

