/**
 * Client-sides scripts (JS) processing.
 */


/** Imports. */

const
  gulp          = require( 'gulp' ),
  colours       = require( 'ansi-colors' ),
  log           = require( 'fancy-log' ),
  webpack       = require( 'webpack' ),

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



/** Name & register tasks. */

// TODO: Break down to scripts:toolkit and scripts:fabricator (if necessary)
gulp.task( 'scripts', getScriptProcessor());
gulp.task( 'scripts:toolkit', getScriptProcessor({ includeToolkit: true, includeFabricator: false }));
gulp.task( 'scripts:fabricator', getScriptProcessor({ includeToolkit: false, includeFabricator: true }));

