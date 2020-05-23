const config = require('./webpack.config.common.js');
const path = require('path');

config.watch = true;
config.devServer = {
    compress: true,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
    open: true,
    overlay: true,
    port: 8000,
    stats: {
        normal: true
    }
};

module.exports = config;
