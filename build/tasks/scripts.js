/**
 * Client-sides scripts (JS) processing.
 */


/** Imports. */

const
  gulp          = require( 'gulp' ),
  colours       = require( 'ansi-colors' ),
  log           = require( 'fancy-log' ),
  webpack       = require( 'webpack' ),
  jsonfile      = require( 'jsonfile' ),

  config               = require( '../build.config' ),
  webpackConfigFactory = require( '../webpack.config' );



/** Tasks. */

function getScriptProcessor({
  includeToolkit,
  includeFabricator,
} = { includeToolkit: true, includeFabricator: true }) {
  const webpackConfig = webpackConfigFactory({ includeToolkit, includeFabricator });

  return ( done ) => {
    webpack( webpackConfig, ( err, stats ) => {
      if ( err ) {
        log.error( colours.red( err()));
      }

      const result = stats.toJson();

      if ( result.errors.length ) {
        result.errors.forEach(( error ) => {
          log.error( colours.red( error ));
        });
      }

      done();
    });
  };
}

function exportEnvironmentConfig( done ) {
  jsonfile.writeFile( `${config.paths.toolkit.scripts}/env.conf.json`, config.getEnvConfig(), ( err ) => {
    if ( err ) log.error( colours.red( err ));
    done();
  });
}



/** Name & register tasks. */

gulp.task( 'scripts:exportEnvironmentConfig', exportEnvironmentConfig );
gulp.task( 'scripts', getScriptProcessor());
gulp.task( 'scripts:toolkit', getScriptProcessor({ includeToolkit: true, includeFabricator: false }));
gulp.task( 'scripts:fabricator', getScriptProcessor({ includeToolkit: false, includeFabricator: true }));

