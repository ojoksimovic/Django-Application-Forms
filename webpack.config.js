const path = require('path');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'django_forms/frontend/src/index.js'),
    output: {
        // options related to how webpack emits results

        // where compiled files go
        path: path.resolve(__dirname, "django_forms/frontend/static/frontend/public/"),

        // 127.0.0.1/static/frontend/public/ where files are served from
        publicPath: "/static/frontend/public/",
        filename: 'main.js',  // the same one we import in index.html
    },
    module: {
        // configuration regarding modules
        rules: [
            {
                // regex test for js and jsx files
                test: /\.(js|jsx)?$/,
                // don't look in the node_modules/ folder
                exclude: /node_modules/,
                // for matching files, use the babel-loader
                use: {
                    loader: "babel-loader",
                    options: {presets: ["@babel/env"]}
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            
        ],
        
    },
};