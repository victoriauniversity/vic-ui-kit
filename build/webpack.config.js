const
  path           = require( 'path' ),
  webpack        = require( 'webpack' ),
  UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' ),

  config  = require( './build.config' );


/**
 * Define plugins based on environment
 *
 * @param {boolean} isDev If in development mode
 *
 * @return {Array}
 */
function getPlugins( isDev ) {
  const plugins = [];

  if ( !isDev ) {
    plugins.push( new webpack.NoEmitOnErrorsPlugin());
  }

  return plugins;
}

module.exports = ({
  includeToolkit,
  includeFabricator,
} = { includeToolkit: true, includeFabricator: true }) => {
  // Add properties: { 'dests_relative_path': 'source' }
  const entries    = {},
    libraryEntries = {};

  if ( includeToolkit ) {
    entries.toolkit = `./${config.paths.toolkit.scriptsIndex}`;

    if ( !config.devMode ) entries['toolkit.min'] = `./${config.paths.toolkit.scriptsIndex}`;

    // Standalone libs
    libraryEntries[`toolkit.tracking${( !config.devMode ) ? '.min' : ''}`] = `./${config.paths.toolkit.scriptModules}/tracking.js`;
    libraryEntries[`toolkit.popups${( !config.devMode ) ? '.min' : ''}`] = `./${config.paths.toolkit.scriptModules}/popups.js`;
    libraryEntries[`toolkit.tooltips${( !config.devMode ) ? '.min' : ''}`] = `./${config.paths.toolkit.scriptModules}/tooltips.js`;
  }

  if ( includeFabricator ) {
    entries[`${config.names.fabricator.dist}/f`] = `./${config.paths.fabricator.scriptIndex}`;
  }

  return [
    {
      entry: entries,

      output: {
        path:     path.resolve( __dirname, '..', config.paths.tmp ),
        filename: '[name].js',
      },

      // (default) devtool: 'eval',

      resolve: {
        extensions: [
          '.js',
        ],
      },

      plugins: getPlugins( config.devMode ),

      mode: config.devMode ? 'development' : 'production',

      module:  {
        rules: [
          {
            test:    /(\.js)/,
            exclude: /(node_modules|\.tmp|dist)/,
            loader:  'babel-loader',
          }, {
            test:   /(\.jpg|\.png)$/,
            loader: 'url-loader?limit=10000',
          }, {
            test:   /\.json/,
            loader: 'json-loader',
          },
        ],
      },

      externals: {
        jquery: 'jQuery',
      },

      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              output: {
                comments: false,
              },
            },
            exclude: 'toolkit.js', // Don't minify!
          }),
        ],
      },
    },

    // Config for standalone libraries compilation
    {
      entry: libraryEntries,

      output: {
        path:     path.resolve( __dirname, '..', config.paths.tmp ),
        filename: '[name].js',
      },

      // (default) devtool: 'eval',

      resolve: {
        extensions: [
          '.js',
        ],
      },

      plugins: getPlugins( config.devMode ),

      mode: config.devMode ? 'development' : 'production',

      module:  {
        rules: [
          {
            test:    /(\.js)/,
            exclude: /(node_modules|\.tmp|dist)/,
            loader:  'babel-loader',
          }, {
            test:   /(\.jpg|\.png)$/,
            loader: 'url-loader?limit=10000',
          }, {
            test:   /\.json/,
            loader: 'json-loader',
          },
        ],
      },

      externals: {
        'jquery':     'jQuery',
        'cookies-js': 'Cookies',
      },

      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              output: {
                comments: false,
              },
            },
          }),
        ],
      },
    },
  ];

};
