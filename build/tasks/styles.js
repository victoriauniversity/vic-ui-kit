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
    gulpif( config.devMode, sourcemaps.init()),
    sass().on( 'error', sass.logError ),
    prefix(),
    csso(),
    rename( 'f.css' ),
    gulpif( config.devMode, sourcemaps.write()),
    gulp.dest( `${config.paths.tmp}/${config.names.fabricator.dist}` ),
  ], done );
}

// Victoria UI Styles
function processToolkitStyles( done ) {
  return pump([
    gulp.src( config.paths.toolkit.sassIndex ),
    gulpif( config.devMode, sourcemaps.init()),
    sass({
      outputStyle:  'expanded',
      includePaths: [
        `${config.paths.root}/node_modules`,
        neat.includePaths,
        `${config.paths.root}/lib`, // TODO: Remove
      ],
    }).on( 'error', sass.logError ),
    prefix(),
    gulpif( config.devMode, sourcemaps.write()),
    gulpif( !config.devMode, gulp.dest( config.paths.tmp )),
    gulpif( !config.devMode, csso({ debug: true })),
    gulpif( !config.devMode, rename( 'toolkit.min.css' )),
    gulp.dest( config.paths.tmp ),
  ], done );
}



/** Name & register tasks. */

gulp.task( 'styles:fabricator', processFabricatorStyles );
gulp.task( 'styles:toolkit', processToolkitStyles );
gulp.task( 'styles', gulp.parallel( 'styles:fabricator', 'styles:toolkit' ));
