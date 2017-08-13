import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ReplacePlugin from 'replace-bundle-webpack-plugin';
import path from 'path';

const ENV = process.env.NODE_ENV || 'development';

const CSS_MAPS = ENV !== 'production';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.scss'],
    modulesDirectories: [
      path.resolve(__dirname, 'src/lib'),
      path.resolve(__dirname, 'node_modules'),
      'node_modules'
    ],
    alias: {
      components: path.resolve(__dirname, 'src/components'), // used for tests
      style: path.resolve(__dirname, 'src/style'),
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        // Transform our own .(scss|css) files with PostCSS and CSS-modules
        test: /\.(scss|css)$/,
        include: [path.resolve(__dirname, 'src/components')],
        loader: [
          `style-loader?singleton`,
          `css-loader?modules&importLoaders=1&sourceMap=${CSS_MAPS}`,
          'postcss-loader',
          `sass-loader?sourceMap=${CSS_MAPS}`
        ].join('!')
      },
      {
        test: /\.(scss|css)$/,
        exclude: [path.resolve(__dirname, 'src/components')],
        loader: [
          `style-loader?singleton`,
          `css?sourceMap=${CSS_MAPS}`,
          `postcss`,
          `sass?sourceMap=${CSS_MAPS}`
        ].join('!')
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(xml|html|txt|md)$/,
        loader: 'raw'
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        loader: ENV === 'production'
          ? 'file?name=[path][name]_[hash:base64:5].[ext]'
          : 'url'
      }
    ]
  },

  postcss: () => [autoprefixer({ browsers: 'last 2 versions' })],

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    })
  ].concat(
    ENV === 'production'
      ? [
          // strip out babel-helper invariant checks
          new ReplacePlugin([
            {
              // this is actually the property name https://github.com/kimhou/replace-bundle-webpack-plugin/issues/1
              partten: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
              replacement: () => 'return;('
            }
          ])
        ]
      : []
  ),

  stats: { colors: true },

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },

  devtool: ENV === 'production' ? 'source-map' : '',

  devServer: {
    port: process.env.PORT || 8080,
    host: 'localhost',
    colors: true,
    publicPath: '/build',
    contentBase: './',
    historyApiFallback: true,
    open: true
  }
};
