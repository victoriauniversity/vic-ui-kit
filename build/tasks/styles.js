/**
 * Styles (CSS, SASS) processing.
 */


/** Imports. */

const
  gulp        = require( 'gulp' ),
  rename      = require( 'gulp-rename' ),
  csso        = require( 'gulp-csso' ),
  sass        = require( 'gulp-sass' ),
  sourcemaps  = require( 'gulp-sourcemaps' ),
  neat        = require( 'bourbon-neat' ),
  prefix      = require( 'gulp-autoprefixer' ),
  gulpif      = require( 'gulp-if' ),
  pump        = require( 'pump' ),

  config      = require( '../build.config' );



/** Tasks. */

// Fabricator's styles
function processFabricatorStyles( done ) {
  return pump([
    gulp.src( config.paths.fabricator.sassIndex ),
    sourcemaps.init(),
    prefix(),
    gulpif( !config.devMode, csso()),
    rename( 'f.css' ),
    sourcemaps.write(),
    gulp.dest( `${config.paths.tmp}/styleguide-assets` ),
    // gulpif( config.isLocal(), browserSync.reload({ stream: true })),
  ], done );
}

// Victoria UI Styles
function processToolkitStyles( done ) {
  return pump([
    gulp.src( config.paths.toolkit.sassIndex ),
    gulpif( config.devMode, sourcemaps.init()),
    sass({
      includePaths: [
        `${config.paths.root}/node_modules`,
        neat.includePaths,
        `${config.paths.root}/lib`, // TODO: Remove
      ],
    }),
    prefix(),
    gulpif( config.devMode, sourcemaps.write()),
    gulp.dest( config.paths.tmp ),
    // csso(),
    rename( 'toolkit.min.css' ),
    gulp.dest( config.paths.tmp ),
  ], done );
}



/** Name & register tasks. */

gulp.task( 'styles:fabricator', processFabricatorStyles );
gulp.task( 'styles:toolkit', processToolkitStyles );
gulp.task( 'styles', gulp.parallel( 'styles:fabricator', 'styles:toolkit' ));
