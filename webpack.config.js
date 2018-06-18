module.exports = {
    entry: ['./src/index.js'],
    mode: 'development',
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
};