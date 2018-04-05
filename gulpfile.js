// Automatically inject all Gulp tasks from the /build/tasks folder
require( 'require-dir' )( './build/tasks', { recurse: true });

/** Dependencies imports. */

const
  gulp   = require( 'gulp' ),

  config = require( './build/build.config' );



/**
 * Main build & deployment tasks.
 *
 * More granular tasks are available in: build/tasks/*.js).
 */


gulp.task( 'build', gulp.series(
  'clean',
  gulp.parallel(
    'assemble:fabricator',
    'styles',
    'scripts',
    'images',
    'fonts',
  ),
  !config.devMode ? 'decorate' : ( done ) => { done(); },
));


// Indended for active development
gulp.task( 'serve', gulp.series(
  'build',
  config.devMode ? 'copy:dist' : 'rev:dist',
  'serverAndWatch',
));

// Makes default (triggered by `gulp`)
gulp.task( 'default', gulp.series( 'serve' ));


// Prepare `stage` release - cache busting
gulp.task( 'release:stage', gulp.series(
  'setEnv:stage',
  'build',
  'rev:dist',
  'git:init',
  'git:commitAll',
  'git:pushToGHPages',
));


// Prepare `production` release - no cache busting
gulp.task( 'release:prod', gulp.series(
  'setEnv:prod',
  'build',
  'copy:dist',
  'copy:release',
  'git:shallowClone',
  'git:exec',
));
