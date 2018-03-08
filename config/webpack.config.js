const defaultConfig = require('../node_modules/@ionic/app-scripts/config/webpack.config');
const merge = require('webpack-merge');
const path = require('path');

const AliasRegexOverridePlugin = require('alias-regex-webpack-plugin');

const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const AwesomeTyprscriptLoader = CheckerPlugin;

const config = {
    resolve: {
        plugins: [
            new TsConfigPathsPlugin(/* { tsconfig, compiler } */),
            //  new AliasRegexOverridePlugin(/^stickies.*/, path.resolve(__dirname, 'node_modules/stickies/src/')),
            //  new AliasRegexOverridePlugin(/ ^ features - detection.*/, path.resolve(__dirname, 'node_modules/features - detection / src / '))
        ],
        // WEIRD but look this https://github.com/ionic-team/ionic-app-scripts/issues/474
        // symlinks: false
    }
}


module.exports = {
    dev: merge(config, defaultConfig.dev),
    prod: merge(config, defaultConfig.prod)
};
