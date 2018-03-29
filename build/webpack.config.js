const
  path    = require( 'path' ),
  webpack = require( 'webpack' ),

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
    plugins.push( new webpack.optimize.DedupePlugin());
  }

  return plugins;
}

module.exports = ({
  includeToolkit,
  includeFabricator,
} = { includeToolkit: true, includeFabricator: true }) => {
  // Add properties: { 'dests_relative_path': 'source' }
  const entries = {};

  if ( includeToolkit ) {
    entries.toolkit = `./${config.paths.toolkit.scriptsIndex}`;
    if ( !config.devMode ) entries['toolkit.min'] = `./${config.paths.toolkit.scriptsIndex}`;
  }

  if ( includeFabricator ) {
    entries['styleguide-assets/f'] = `./${config.paths.fabricator.scriptIndex}`;
  }

  return {
    entry: entries,

    output: {
      path:     path.resolve( __dirname, '..', config.paths.tmp ),
      filename: '[name].js',
    },

    devtool: 'source-map',

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
  };

};
