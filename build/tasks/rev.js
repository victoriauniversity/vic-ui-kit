/**
 * Files version revving for the cache-busting.
 */


/** Imports. */

const gulp = require( 'gulp' ),
  pump     = require( 'pump' ),
  revAll   = require( 'gulp-rev-all' ),

  config = require( '../build.config' );



/** Tasks. */

// Files revver
function cachebustFiles( done ) {
  // TODO: Specify more closely
  return pump([
    gulp.src( `${config.paths.tmp}/**` ),
    revAll.revision({
      // prefix: HOST,
      // hashLength: 8, // Default = 8
      // Docs: www.npmjs.com/package/gulp-rev-all#options
      includeFilesInManifest: [
        '.js',
        '.css',
        '.svg',
        '.woff',
        '.woff2',
        '.ttf',
        '.ico',
      ],
      dontRenameFile: [
        'CNAME',
        '.html',
      ],
      dontUpdateReference: [
        'CNAME',
        '.html',
      ],
    }),
    gulp.dest( config.paths.dist ),
  ], done );
}



/** Name & register tasks. */

gulp.task( 'rev:dist', cachebustFiles );
