const path = require("path");
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

let config = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './app/index.jsx', // Your appʼs entry point
    ],
    node: {
        __dirname: false,
        __filename: false
    },
    output: {
        filename: 'bundle.js',
        publicPath: 'http://localhost:3000/'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['react-hot-loader', 'babel-loader'], include: path.join(__dirname, 'app') }
        ]
    }

};

config.target = webpackTargetElectronRenderer(config);

module.exports = config