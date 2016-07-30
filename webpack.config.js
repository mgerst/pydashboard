var fs = require('fs');
var path = require('path');
var glob = require('glob');

// Webpack and third party plugins.
var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');

// Environment detection.
var node_env = process.env.NODE_ENV || 'development';

/**************************
 * Configuration Settings *
 **************************/

// Where is your project located relative to this config?
var context = __dirname;

// Where are your source assets located?
var rootAssetPath = './src';
var contextRoot = path.join(context, rootAssetPath);

// Which human languages do you want to support? (regex)
var languages = /en/;

// Where will the files get built to?
var buildOutputPath = './build/public';

// How should certain asset types be configured?
var assets = {
  fonts: {
    path: 'fonts',
    filename: '[path][name].[hash].[ext]'
  },
  images: {
    path: 'images',
    filename: '[path][name].[hash].[ext]'
  },
  scripts: {
    path: 'scripts',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  styles: {
    path: 'styles',
    filename: '[name].[chunkhash].css'
  }
};

// Which top level JS and CSS files should get output?
var chunks = {
  app_js: [
    path.join(contextRoot, assets.scripts.path, 'app.js')
  ],
  app_css: [
    path.join(contextRoot, assets.styles.path, 'app.scss')
  ],
  //vendor_js: [],
  //vendor_css: []
};

// Find widget stylesheets
const widget_css = glob.sync(path.join(contextRoot, "scripts/components/Widgets/**/*.scss"));
chunks.app_css = chunks.app_css.concat(widget_css);

console.log("app_css: ", chunks.app_css);

// Avoid parsing this code to speed up rebuilds.
var noParse = [
  //path.join(contextRoot, assets.scripts.path, 'vendor'),
  //path.join(contextRoot, assets.styles.path, 'vendor')
];

// Where will assets get served in development mode? This depends on running
// the webpack dev server.
var publicPath = process.env.PUBLIC_PATH || 'http://localhost:2992/assets/';

/*********************************************************************
 * Do not edit past this line unless you are tinkering with webpack. *
 *********************************************************************/
var extractTextPlugin = new ExtractTextPlugin(assets.styles.filename);

// Plugins that will load in all environments.
var plugins = [
  // http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
  new webpack.NoErrorsPlugin(),

  // http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugins
  //new webpack.optimize.CommonsChunkPlugin('vendor_js', 'vendor_js.js'),

  // http://github.com/webpack/extract-text-webpack-plugin
  extractTextPlugin,

  // http://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, languages),

  // https://github.com/nickjj/manifest-revision-webpack-plugin
  new ManifestRevisionPlugin(path.join('build', 'manifest.json'), {
    rootAssetPath: rootAssetPath,
    ignorePaths: ['/fonts', '/styles', '/scripts']
  })
];

// Development environment only plugins.
if (node_env !== 'development') {
  var developmentPlugins = [
    // http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}),

    // http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    new webpack.optimize.DedupePlugin()
  ];

  plugins.push(developmentPlugins[0])
}

module.exports = {
  context: path.join(__dirname, './'),
  entry: chunks,
  output: {
    path: buildOutputPath,
    publicPath: publicPath,
    filename: assets.scripts.filename,
    chunkFilename: assets.scripts.chunkFilename
  },
  resolve: {
    // Allow requiring files without supplying the extension.
    extensions: ['', '.js', '.scss']
  },
  module: {
    noParse: noParse,
    loaders: [
      {
        test: /\.js$/i,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      {
        test: /\.s?css$/i,
        loader: ExtractTextPlugin.extract('style-loader',
          'css-loader!sass-loader?includePaths[]=' + path.join(contextRoot, assets.styles.path))
      },
      {
        test: /\.(jpe?g|png|gif|svg([\?]?.*))$/i,
        loaders: [
          'file?context=' + rootAssetPath + '&name=' + assets.images.filename,
          'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.(woff([\?]?.*)|woff2([\?]?.*))$/i,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(ttf([\?]?.*)|eot([\?]?.*))$/i,
        loader: 'file-loader?context=' + rootAssetPath + '&name=' + assets.fonts.filename
      }
    ]
  },
  plugins: plugins,
}
