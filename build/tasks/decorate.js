/**
 * Decorates various files with additional (debugging/copyright) information.
 */


/** Imports. */

const
  gulp   = require( 'gulp' ),
  pump   = require( 'pump' ),
  header = require( 'gulp-header' ),

  config = require( '../build.config' );



/** Helpers. */

const TIME = new Date(),
  BANNER_BUILD = `Version: ${config.version} ${process.env.CI_COMMIT_ID ? `(build #${process.env.CI_COMMIT_ID} + ) ` : ''} | ${TIME.toDateString()} ${TIME.getHours()}:${( `0 ${TIME.getMinutes()}` ).slice( -2 )}`;



/** Tasks. */

function decorateTemplates( done ) {
  return pump([
    gulp.src( `${config.paths.tmp}/**/*.html` ),
    header( `<!-- ${BANNER_BUILD} -->\n` ),
    gulp.dest( config.paths.tmp ),
  ], done );
}

function decorateScripts( done ) {
  pump([
    gulp.src( `${config.paths.tmp}/*.js` ),
    header( `/** ${BANNER_BUILD} */\n` ),
    gulp.dest( config.paths.tmp ),
  ], done );
}

function decorateStyles( done ) {
  pump([
    gulp.src( `${config.paths.tmp}/*.css` ),
    header( `@charset "UTF-8";\n/** ${BANNER_BUILD} */\n` ),
    gulp.dest( config.paths.tmp ),
  ], done );
}




/** Register gulp tasks. */

gulp.task( 'decorate:templates', decorateTemplates );
gulp.task( 'decorate:scripts', decorateScripts );
gulp.task( 'decorate:styles', decorateStyles );

gulp.task( 'decorate', gulp.parallel( 'decorate:scripts', 'decorate:styles', 'decorate:templates' ));
