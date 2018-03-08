const defaultConfig = require('../node_modules/@ionic/app-scripts/config/watch.config');

// https://github.com/ionic-team/ionic-app-scripts/issues/474


defaultConfig.srcFiles.paths.push(...[
    '../Stickies/src/**/*.ts',
    '~/Libraries/FeaturesDetection/src/**/*.ts',
    // '{{SRC}}/**/*.(ts|html|s(c|a)ss)'
]);
// defaultConfig.srcFiles.options.followSymlinks = true;

// In webpack.config.js
// Add symlinks: false under module.exports.resolve. Yes, I know it sounds counter-intuitive.

console.log('CACACACACCAASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSs', defaultConfig);
module.exports = defaultConfig;
