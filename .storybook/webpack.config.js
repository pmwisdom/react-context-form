var package = require('../package.json'),
    webpack = require('webpack'),
    path = require('path');

module.exports = config => {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                VERSION: JSON.stringify(package.version)
            }
        })
    );
    config.resolve.extensions.push('.ts', '.tsx');

    config.module.rules.push(
        {
            test: /\.ts$/,
            enforce: 'pre',
            loader: 'tslint-loader',
            options: {
                tsConfigFile: 'tsconfig.build.json'
            }
        },
        {
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }
    );

    config.module.rules[0].exclude.push(path.join(__dirname, '../dist'));

    config.watchOptions = {
        poll: 1000
    };

    return config;
};
