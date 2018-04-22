/**
 * Temporary and distribution directories cleanup.
 */


/** Imports. */

const
  gulp   = require( 'gulp' ),
  del    = require( 'del' ),

  config = require( '../build.config' );



/** Tasks. */
function clean() { return del([ config.paths.tmp, config.paths.dist ]); }
function cleanDist() { return del([ config.paths.dist ]); }
function cleanTmp() { return del([ config.paths.tmp ]); }

function cleanTmpTemplates() {
  return del([ `${config.paths.tmp}/**/*.html` ]);
}
function cleanTmpFonts() {
  return del( `${config.paths.tmp}/fonts` );
}
function cleanTmpImages() {
  return del( `${config.paths.tmp}/images` );
}


/** Name & register tasks. */

gulp.task( 'clean', clean );
gulp.task( 'clean:dist', cleanDist );

gulp.task( 'clean:tmp', cleanTmp );
gulp.task( 'clean:tmp:templates', cleanTmpTemplates );
gulp.task( 'clean:tmp:fonts', cleanTmpFonts );
gulp.task( 'clean:tmp:images', cleanTmpImages );
