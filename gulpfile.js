// Automatically inject all Gulp tasks from the /build/tasks folder
require( 'require-dir' )( './build/tasks', { recurse: true });

/** Dependencies imports. */

const gulp          = require( 'gulp' );


/** Main configuration object. */



/** Standard build & deployment tasks. */
gulp.task( 'build', gulp.series( 'clean', 'styles', 'scripts', 'images', 'fonts', 'assemble:fabricator', 'decorate' ));

gulp.task( 'release:stage', gulp.series( 'setEnv:stage', 'build', 'rev', 'git:init', 'git:commitAll', 'git:pushToGHPages' ));

gulp.task( 'release:prod', gulp.series( 'setEnv:prod', 'build', 'copy:dist', 'copy:release', 'git:shallowClone', 'git:exec' ));

gulp.task( 'serve', gulp.series( 'build', 'rev', 'serverAndWatch' ));

// DEFAULT build task (alias to 'serve')
gulp.task( 'default', gulp.series( 'serve' ));
