

var defaultConfig = require('../node_modules/@ionic/app-scripts/config/webpack.config');
const merge = require('webpack-merge');

class ModulesInLocalPackagePlugin {
    constructor() { }

    apply(resolver) {
        const _this = this; // in case the framework call apply with a this context

        resolver.plugin('module', function (request, callback) {

            const localPackages = _this.readLocalPackages(request.descriptionFileData.dependencies);
            const moduleRequested = request.request.split('/')[0];

            const moduleIsLocalPackage = Object.keys(localPackages).some((local) => local === moduleRequested);

            if (moduleIsLocalPackage) {
                // localPackages is an object of { packageName: 'file:relativePathOfPackage'}
                const relativePathLocalPackage = localPackages[moduleRequested].split('file:')[1];

                const absolutePathLocalNodeModules = _this.findLocalNodeModules(request.path, resolver);

                if (absolutePathLocalNodeModules.err)
                    callback(err);
                else {

                    const obj = Object.assign({}, request, {
                        path: absolutePathLocalNodeModules.nodeModulesPath,
                        // path.resolve(request.descriptionFileRoot, relativePathLocalPackage, 'node_modules'), // absolute path to the local root project
                        request: "./" + request.request
                    });

                    callback.stack[callback.stack.length - 1] = callback.stack[callback.stack.length - 1] + ' thomas is here :)';

                    // we restart from the resolve plugin process
                    resolver.doResolve('resolve', obj, "looking for modules in " + obj.path, callback);
                }

            } else
                callback(); // we go to the next 'module' plugin for the non local packages
        });

    }

    readLocalPackages(dependencies) {

        let localPakages = {};

        for (let name of Object.getOwnPropertyNames(dependencies)) {
            if (dependencies[name].startsWith('file')) {
                localPakages[name] = dependencies[name];
            }
        }

        return Object.getOwnPropertyNames(localPakages).length === 0 ? undefined : localPakages;
    }

    findLocalNodeModules(pathRequested, resolver) {
        const nodeModules = 'node_modules';
        let dir = pathRequested;

        let localPackages = undefined;

        while (dir !== '') {

            if (fs.existsSync(resolver.join(dir, nodeModules))) {
                return {
                    err: null,
                    nodeModulesPath: resolver.join(dir, nodeModules)
                }
            }

            dir = resolver.join('/', dir.split('/').slice(0, -1).join('/'));
        }


        return {
            err: new Error(`${moduleRequested} doesn't have a node_modules folder in the project`)
        };
    }



}



extraConfig = {
    plugins: [
        new ModulesInLocalPackagePlugin()
    ]
}


module.exports = {
    dev: merge(extraConfig, defaultConfig.dev),
    prod: merge(extraConfig, defaultConfig.prod)
};
