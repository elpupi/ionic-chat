const RootMostResolvePlugin = require('webpack-dependency-suite').RootMostResolvePlugin;
const path = require('path');
const merge = require('webpack-merge');
const DescriptionFileUtils = require('enhanced-resolve/lib/DescriptionFileUtils');
const fs = require('graceful-fs');

class MyResolverPlugin {
    constructor(source = 'resolve-step', target = 'resolve') {
        this.source = source;
        this.target = target;
    }

    apply(resolver) {
        resolver.plugin(this.source, (type, resolved) => {
            console.log(type, ' --> ', resolved.path);
        });
    }
}




class MyResolverPlugin2 {
    constructor(source = 'relative', target = 'described-relative') {
        this.source = source;
        this.target = target;
    }

    apply(resolver) {
        resolver.plugin(this.source, (request, callback) => {
            // console.log(request.path);
            resolver.doResolve(this.target, request, null, callback);
        });
    }
}




class MyResolverPlugin3 {

    constructor() { }

    apply(resolver) {
        resolver.plugin('module', (request, next) => {
            next();
            //if(request.path!==)
            // resolver.doResolve(this.target, request, null, callback);
        });
    }
}

class ModulesInLocalPackagePlugin {
    constructor() { }

    apply2(resolver) {
        const _this = this; // in case the framework call apply with a this context

        resolver.plugin('module', function (request, callback) {

            const localPackages = _this.readLocalPackages(request.descriptionFileData.dependencies);
            const moduleRequested = request.request.split('/')[0];

            const moduleIsLocalPackage = Object.keys(localPackages).some((local) => local === moduleRequested);

            if (moduleIsLocalPackage) {
                // localPackages is an object of { packageName: 'file:relativePathOfPackage'}
                const relativePathLocalPackage = localPackages[moduleRequested].split('file:')[1];

                const absolutePathLocalNodeModules = _this.findLocalNodeModules(request.path, resolver);

                const testPath = path.resolve(request.descriptionFileRoot, relativePathLocalPackage, 'node_modules');

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


    apply(resolver) {
        const _this = this; // in case the framework call apply with a this context

        resolver.plugin('module', function (request, callback) {

            const absolutePathLocalNodeModules = _this.findLocalNodeModules(request.path, resolver)

            if (absolutePathLocalNodeModules.err)
                callback(err);
            else {
                const obj = Object.assign({}, request, {
                    path: absolutePathLocalNodeModules.nodeModulesPath,
                    request: "./" + request.request
                });


                resolver.doResolve('resolve', obj, "looking for modules in " + obj.path, callback);
            }
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


    findLocalNodeModules2(pathRequested, resolver) {
        const packageJson = 'package.json';
        let dir = pathRequested;

        let localPackages = undefined;

        while (dir !== '') {

            if (fs.existsSync(resolver.join(dir, packageJson))) {
                return {
                    err: null,
                    nodeModulesPath: resolver.join(dir, 'node_modules')
                }
            }

            dir = resolver.join('/', dir.split('/').slice(0, -1).join('/'));
        }


        return {
            err: new Error(`${moduleRequested} doesn't have a node_modules folder in the project`)
        };
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



class MyCompilerPlugin {
    constructor(directory = __dirname) {
        this.pathToPackageJson = path.join(directory, 'package.json');
    }

    apply(compiler) {
        compiler.plugin("compile", function (params) {


            // console.log("The compiler is starting to compile...");
            const resolver = params.normalModuleFactory.resolvers.normal;


        }.bind(this));

        compiler.plugin("compilation", function (compilation) {
            // console.log("The compiler is starting a new compilation...");
            const packageFile = 'package.json';
            let dir = compilation.options.context;

            let localPackages = undefined;

            while (dir !== '') {

                if (fs.existsSync(path.join(dir, packageFile))) {
                    localPackages = this.readPackage(path.join(dir, packageFile));
                    break;
                }

                dir = path.join('/', dir.split('/').slice(0, -1).join('/'));
            }

            if (localPackages === undefined)
                console.warning(`package.json doesn't exist in your poject. Plugin can't be applied.`);
            else { // we have local packages

                if (localPackages.err)
                    console.error(localPackages.err);
                else if (localPackages.packages !== undefined)
                    this.createPlugin(localPackages.packages);
            }

        }.bind(this));

    }

    readPackage(path) {
        try {
            const packageJson = JSON.parse(fs.readFileSync(path, 'utf8'));

            let localPakages = {};

            for (let name of Object.getOwnPropertyNames(packageJson.dependencies)) {
                if (packageJson.dependencies[name].startsWith('file')) {
                    localPakages.name = packageJson.dependencies[name];
                }
            }

            return {
                err: null,
                packages: Object.getOwnPropertyNames(localPakages).length === 0 ? undefined : localPakages
            };
        }
        catch (err) {
            console.err('here was an error reading the file');
            return { err };
        }

    }


    createPlugin(localPakages) {
        console.log(localPakages);
    }
}


var devConfig = {
    entry: path.join(__dirname, 'test/test.js'),
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: 'test/',
        filename: '[name].js',
    },

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [path.resolve('node_modules')],
        plugins: [
            new ModulesInLocalPackagePlugin()
            // new MyResolverPlugin3(),
            // new MyResolverPlugin3(),
            // new MyResolverPlugin3(),
            /// new MyResolverPlugin(),
            // new RootMostResolvePlugin('/home/milottit/Libraries/IonicChat', true)
        ]
    },
    plugins: [
        // new MyCompilerPlugin(path.join(__dirname, '../'))
    ],
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            /*{
                test: /\.ts$/,
                loader: process.env.IONIC_WEBPACK_LOADER
            }*/
        ]
    },

};


module.exports = devConfig;
