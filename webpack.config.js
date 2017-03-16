
const NODE_ENV = process.env.NODE_ENV || 'dev';
const webpack = require('webpack')


module.exports = {

	entry: "./widget.js",
	output : {
		path: __dirname + "/dist",
		publicPath:  './dist/',
		filename: "bundle.js"
	},

	watch : NODE_ENV == 'dev',
	watchOptions : {
		aggreateTimeout : 100
	},

	devtool : NODE_ENV == 'dev' ? 'source-map' : false,

	module : {

		rules: [
     
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }],
      },

      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },


       {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        },


  	 
         {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 100000
        },
      },

          { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,

           loader: "file-loader" }    
      // Loaders for other file types can go here
    ]

	},

	plugins : []
}	


if(NODE_ENV=='prod'){

	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress : {
				warnings : false,
				drop_console : true,
				unsafe : true
			}
		}))

}

if(NODE_ENV=='prod'){
module.exports.module.rules.push(
      {
    test: /\.(gif|png|jpe?g|svg)$/i,
    loaders: [
      'url-loader?limit=10000',
      'image-webpack-loader?{optimizationLevel: 7, interlaced: false, pngquant:{quality: "30", speed: 1}, mozjpeg: {quality: 30}}'
    ]
  }

)

}

