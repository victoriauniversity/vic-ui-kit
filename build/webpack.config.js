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

    // const minificationExtension = ( !config.devMode ) ? '.min' : '';

    // Add listed standalone modules and libraries to the build
    //TODO: Automate this!
    [
      'tracking',
      'popups',
      'tooltips',
      'lazyloader',
      'toolbar',
      'filtering',
      'urls',
      'core',
    ].forEach(( moduleName ) => {
      libraryEntries[`toolkit.${moduleName}`] = `./${config.paths.toolkit.scriptModules}/${moduleName}.js`;
      libraryEntries[`toolkit.${moduleName}.min`] = `./${config.paths.toolkit.scriptModules}/${moduleName}.js`;
    });
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
            test:    /\.js$/,
            exclude: /(node_modules|\.tmp|dist)/,
            loader:  'babel-loader',
          }, {
            test:   /(\.jpg|\.png)$/,
            loader: 'url-loader?limit=10000',
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
            test:    /\.js$/,
            exclude: /(node_modules|\.tmp|dist)/,
            loader:  'babel-loader',
          }, {
            test:   /(\.jpg|\.png)$/,
            loader: 'url-loader?limit=10000',
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
