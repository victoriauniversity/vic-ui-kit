/**
 * Fonts processing.
 */


/** Imports. */

const
  gulp   = require( 'gulp' ),
  pump   = require( 'pump' ),

  config = require( '../build.config' );


/** Tasks. */

function processFonts( done ) {
  return pump([
    gulp.src( config.paths.toolkit.fonts ),
    gulp.dest( config.paths.tmp ),
  ], done );
}



/** Name & register tasks. */

gulp.task( 'fonts', processFonts );
