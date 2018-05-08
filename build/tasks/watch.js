/**
 * Starts a development server and reloads whenever appropriate files
 * get changed.
 */


/** Imports. */

const
  gulp   = require( 'gulp' ),
  server = require( 'browser-sync' ).create(),

  config = require( '../build.config' );



/** Source to watch (globbed). */

const sourceGlobs = {
  templates: `${config.paths.src}/**/*${config.extensions.templates}`,
  toolkit:   {
    sass:    `${config.paths.toolkit.sass}/**/*${config.extensions.sass}`,
    scripts: `${config.paths.toolkit.scripts}/**/*${config.extensions.scripts}`,
  },
  fonts:  `${config.paths.toolkit.fonts}/**/*${config.extensions.fonts}`,
  images: `${config.paths.toolkit.images}/**/*${config.extensions.images}`,
};



/** Tasks. */

function serverAndWatch() {

  // Config the server and run it
  server.init({
    server: {
      baseDir: config.paths.dist,
    },

    port:      config.getEnvConfig().server.port,
    https:     config.getEnvConfig().server.protocol === 'https',
    ui:        false, // Disable server's UI
    notify:    false, // Disable popups
    cors:      true, // Allows including localhost files in external webpages
    logPrefix: 'VIC-UI-KIT',
  });

  config.runningServer = server;

  function browserReload( done ) {
    server.reload();
    done();
  }

  // Enable watching. Format: gulp.watch( files to watch (globs), tasks to trigger function )
  gulp.watch( sourceGlobs.templates, gulp.series( 'rebuild:templates', browserReload ));

  gulp.watch( sourceGlobs.toolkit.sass, gulp.series( 'rebuild:styles:toolkit' ));

  gulp.watch( sourceGlobs.toolkit.scripts, gulp.series( 'rebuild:scripts:toolkit', browserReload ));

  gulp.watch( sourceGlobs.fonts, gulp.series( 'rebuild:fonts', browserReload ));

  gulp.watch( sourceGlobs.images, gulp.series( 'rebuild:images', browserReload ));
}



/** Name & register tasks. */

// Tasks triggered by file changes
gulp.task( 'rebuild:templates', gulp.series( 'clean:tmp:templates', 'assemble:fabricator', 'clean:dist', 'copy:dist' ));
gulp.task( 'rebuild:styles:toolkit', gulp.series( 'styles:toolkit', 'copy:dist:styles' ));
gulp.task( 'rebuild:scripts:toolkit', gulp.series( 'scripts:toolkit', 'copy:dist:scripts' ));
gulp.task( 'rebuild:fonts', gulp.series( 'clean:tmp:fonts', 'fonts', 'copy:dist:fonts' ));
gulp.task( 'rebuild:images', gulp.series( 'clean:tmp:images', 'images', 'copy:dist:images' ));

// Watch tasks
gulp.task( 'serverAndWatch', serverAndWatch );
