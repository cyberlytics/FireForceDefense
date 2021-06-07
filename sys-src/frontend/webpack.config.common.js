const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'main.css',
        }),
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'assets'),
                    to: path.resolve(__dirname, 'dist/assets'),
                },
                {
                    from: path.resolve(__dirname, 'src/index.html'),
                    to: path.resolve(__dirname, 'dist/index.html'),
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preloaders: {
                        i18n: 'yaml-loader',
                    },
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                        i18n: '@intlify/vue-i18n-loader',
                    },
                },
            },
            /*{
                resourceQuery: /blockType=i18n/,
                type: 'javascript/auto',
                loader: '@intlify/vue-i18n-loader',
            },*/
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,

                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader', // post process the compiled CSS
                    'sass-loader', // compiles Sass to CSS, using Node Sass by default
                ],
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts/',
                    },
                },
            },
            {
                test: /.png$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/img/',
                    },
                },
            },
        ],
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@assets': path.resolve(__dirname, 'assets'),
            '@cells': path.resolve(__dirname, 'src/cells'),
            '@contents': path.resolve(__dirname, 'src/contents'),
            '@effects': path.resolve(__dirname, 'src/effects'),
            '@levels': path.resolve(__dirname, 'src/levels'),
            '@model': path.resolve(__dirname, 'src/model'),
            '@services': path.resolve(__dirname, 'src/services'),
        },
        extensions: ['.tsx', '.ts', '.js', '.scss', '.vue'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
