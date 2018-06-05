/**
 * Copies static assets.
 */


/** Imports. */

const
  gulp   = require( 'gulp' ),
  gulpif = require( 'gulp-if' ),
  pump   = require( 'pump' ),
  rename = require( 'gulp-rename' ),

  config = require( '../build.config' );



/** Tasks. */

// Copy all files from temporary into distribution folder
function copyDist( done ) {
  return pump([
    gulp.src( `${config.paths.tmp}/**` ),
    gulp.dest( config.paths.dist ),
  ], done );
}

// Create latest 'ready-to-release' version (~ e.g: dist/1.0.3)
function copyRelease( done ) {
  return pump([
    gulp.src([
      `${config.paths.tmp}/**`,
      `${config.paths.releaseStatics}/**`,
      `${config.paths.releaseStatics}/.gitignore`,
    ]),
    gulp.dest( `${config.paths.dist}/${config.version}` ),
  ], done );
}

// Copy static files into temp folder
function copyTmp( done ) {
  const staticFiles = [
    config.paths.fabricator.favicon,
    `${config.paths.src}/browserconfig.xml`,
    `${config.paths.src}/site.webmanifest`,
  ];

  if ( config.isStage()) staticFiles.push( config.paths.githubCname );

  return pump([
    gulp.src( staticFiles ),
    gulp.dest( config.paths.tmp ),
  ], done );
}


function copyStylesToDist( done ) {
  function streamStyles() {
    if ( config.runningServer ) return config.runningServer.stream();

    return null;
  }


  return pump([
    gulp.src( `${config.paths.tmp}/*${config.extensions.styles}` ),
    gulp.dest( config.paths.dist ),
    // Stream the new files into the local dev server, if it exists
    gulpif( Boolean( config.runningServer ), streamStyles()),
  ], done );
}

function copyScriptsToDist( done ) {
  return pump([
    gulp.src([
      `${config.paths.tmp}/*${config.extensions.scripts}`,
      `${config.paths.tmp}/*${config.extensions.maps}`,
    ]),
    gulp.dest( config.paths.dist ),
  ], done );
}

function copyFontsToDist( done ) {
  return pump([
    gulp.src( `${config.paths.tmp}/fonts` ),
    gulp.dest( config.paths.dist ),
  ], done );
}

function copyImagesToDist( done ) {
  return pump([
    gulp.src( `${config.paths.tmp}/images` ),
    gulp.dest( config.paths.dist ),
  ], done );
}


function copyRevvedAssetsInDist( done ) {
  return pump([
    gulp.src([
      `${config.paths.dist}/*${config.extensions.styles}`,
      `${config.paths.dist}/*${config.extensions.scripts}`,
      `${config.paths.dist}/*${config.extensions.maps}`,
    ]),
    rename(( path ) => {
      // Strip the hash from the file-name to 'de-rev' it.
      path.basename = path.basename.replace( /(\.[a-z0-9]*)$/g, '' );
      return path;
    }),
    gulp.dest( `${config.paths.dist}` ),
  ], done );
}



/** Name & register tasks. */

gulp.task( 'copy:release', copyRelease );
gulp.task( 'copy:tmp', copyTmp );

gulp.task( 'copy:dist', copyDist );
gulp.task( 'copy:dist:styles', copyStylesToDist );
gulp.task( 'copy:dist:scripts', copyScriptsToDist );
gulp.task( 'copy:dist:fonts', copyFontsToDist );
gulp.task( 'copy:dist:images', copyImagesToDist );
gulp.task( 'copy:dist:unrevAssets', copyRevvedAssetsInDist );



