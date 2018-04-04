/**
 * Images processing.
 */


/** Imports. */

const
  gulp     = require( 'gulp' ),
  imagemin = require( 'gulp-imagemin' ),
  pump     = require( 'pump' ),

  config    = require( '../build.config' );



/** Tasks. */

function processImages( done ) {
  return pump([
    gulp.src( `${config.paths.toolkit.images}/**` ),
    imagemin(),
    gulp.dest( `${config.paths.tmp}/images` ),
  ], done );
}



/** Name & register tasks. */

gulp.task( 'images', processImages );
