/** Dependencies imports. */

const assembler = require( 'fabricator-assemble' ),
  fs            = require( 'fs' ),
  browserSync   = require( 'browser-sync' ),
  csso          = require( 'gulp-csso' ),
  colours       = require( 'ansi-colors' ),
  log           = require( 'fancy-log' ),
  del           = require( 'del' ),
  gulp          = require( 'gulp' ),
  gulpif        = require( 'gulp-if' ),
  git           = require( 'gulp-git' ),
  helpers       = require( 'handlebars-helpers' )(),
  imagemin      = require( 'gulp-imagemin' ),
  prefix        = require( 'gulp-autoprefixer' ),
  pump          = require( 'pump' ),
  rename        = require( 'gulp-rename' ),
  sass          = require( 'gulp-sass' ),
  sourcemaps    = require( 'gulp-sourcemaps' ),
  webpack       = require( 'webpack' ),
  revAll        = require( 'gulp-rev-all' ),
  header        = require( 'gulp-header' ),
  bump          = require( 'gulp-bump' ),
  semver        = require( 'semver' ),
  neat          = require( 'bourbon-neat' ),
  args          = require( 'minimist' )( process.argv.slice( 2 )),

  { exec }      = require( 'child_process' ).exec,


  /** Build directories. */

  DIR_TMP  = '.tmp',
  DIR_DIST = 'dist',


  /** Project settings. */


  // Repositories

  GITHUB_SECRET_TOKEN   = process.env.GITHUB_TOKEN || '', // Environmental variable `GITHUB_TOKEN` has to be set up on the CI or within the user's environment to make the builds successful!

  GITHUB_RELEASE_REPO   = `https: //${GITHUB_SECRET_TOKEN}@github.com/victoriauniversity/victoria-ui-releases.git`,
  GITHUB_RELEASE_BRANCH = 'releases',
  GITHUB_SOURCE_REPO    = `https: //${GITHUB_SECRET_TOKEN}@github.com/victoriauniversity/vic-ui-kit.git`,
  GITHUB_SOURCE_BRANCH  = 'gh-pages';


// Build information

const packageJSON = JSON.parse( fs.readFileSync( './package.json' ), 'utf8' ) || {}; // See package.json for more details

const isProduction = Boolean( args.prod );

/** Main configuration object. */
const config = {
    host:    'https/localhost:3000', // 'http' or 'https' *ONLY* //TODO: Should be environment-based!
    version: packageJSON.version,
    pkg:     packageJSON,
    dev:     !isProduction,
    styles:  {
      fabricator: {
        src:   'src/assets/fabricator/styles/fabricator.scss',
        dest:  `${DIR_TMP}/styleguide-assets`,
        watch: 'src/assets/fabricator/styles/**/*.scss',
      },
      toolkit: {
        src:   'src/assets/toolkit/styles/toolkit.scss',
        dest:  DIR_TMP,
        watch: 'src/assets/toolkit/styles/**/**/*.scss',
      },
    },
    scripts: {
      fabricator: {
        src:        './src/assets/fabricator/scripts/fabricator.js',
        pathInDest: '/styleguide-assets/f', // *MUST BE* without a .js extension
        watch:      'src/assets/fabricator/scripts/**/*',
      },
      toolkit: {
        src:                './src/assets/toolkit/scripts/toolkit.js',
        pathInDest:         'toolkit', // *MUST BE* without a .js extension
        minifiedPathInDest: 'toolkit.min', // *MUST BE* without a .js extension
        watch:              'src/assets/toolkit/scripts/**/*',
      },
    },
    images: {
      toolkit: {
        src:   [ 'src/assets/toolkit/images/**/*' ],
        dest:  `${DIR_TMP}/images`,
        watch: 'src/assets/toolkit/images/**/*',
      },
    },
    fonts: {
      toolkit: {
        src:   'src/assets/toolkit/fonts/*',
        dest:  `${DIR_TMP}/fonts`,
        watch: 'src/assets/toolkit/fonts/**/*',
      },
    },
    templates: {
      watch: 'src/**/*.{html,md,json,yml}',
    },
    dist: DIR_DIST,
    tmp:  DIR_TMP,
  },

  BUILD_TIME = new Date(),
  BUILD_MSG = `Version: ${config.version} ${process.env.CI_COMMIT_ID ? `(build #${process.env.CI_COMMIT_ID} + ) ` : ''} | ${BUILD_TIME.toDateString()} ${BUILD_TIME.getHours()}:${( `0 ${BUILD_TIME.getMinutes()}` ).slice( -2 )}`,


  // Pack scripts using WebPack
  webpackConfig = require( './build/webpack.config' )( config );





/** Shared (Fabricator + App) routines. */

// Temporary and distribution directories cleanup
gulp.task( 'clean', del.bind( null, [ config.tmp, config.dist ]));
gulp.task( 'clean:dist', del.bind( null, [ config.dist ]));
gulp.task( 'clean:tmp', del.bind( null, [ config.tmp ]));


// JavaScripts compiled by WebPack
gulp.task( 'scripts', ( done ) => {
  webpack( webpackConfig, ( err, stats ) => {
    if ( err ) {
      log.error( colours.red( err()));
    }

    const result = stats.toJson();

    if ( result.errors.length ) {
      result.errors.forEach(( error ) => {
        log.error( colours.red( error ));
      });
    }

    done();
  });
});



// Files revver
gulp.task( 'rev', ( cb ) => {
  pump([
    gulp.src( `${config.tmp}/**` ),
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
    gulp.dest( config.dist ),
  ], cb );
});


gulp.task( 'decorate:templates', ( cb ) => {
  pump([
    gulp.src( `${config.tmp}/**/*.html` ), // HTML
    header( `<!-- ${BUILD_MSG} -->\n` ),
    gulp.dest( config.tmp ),
  ], cb );
});


gulp.task( 'decorate:assets', ( cb ) => {
  pump([
    gulp.src( `${config.tmp}/*.{js,css}` ), // JS + CSS
    header( `/** ${BUILD_MSG} */\n` ),
    gulp.dest( config.tmp ),
  ], cb );
});

gulp.task( 'decorate', gulp.series( 'decorate:assets', 'decorate:templates' ));





/** StyleGuide (Fabricator) *ONLY* routines. */

// Fabricator's styles
gulp.task( 'styles:fabricator', ( cb ) => {
  pump([
    gulp.src( config.styles.fabricator.src ),
    sourcemaps.init(),
    prefix(),
    gulpif( !config.dev, csso()),
    rename( 'f.css' ),
    sourcemaps.write(),
    gulp.dest( config.styles.fabricator.dest ),
    gulpif( config.dev, browserSync.reload({ stream: true })),
  ], cb );
  cb();
});


// Style guide's icon
gulp.task( 'favicon', ( cb ) => {
  pump([
    gulp.src( 'src/favicon.ico' ),
    gulp.dest( config.tmp ),
  ], cb );
});


// CNAME record for custom domain running on GitHubPages
gulp.task( 'cname', ( cb ) => {
  pump([
    gulp.src( 'src/CNAME' ),
    gulp.dest( config.tmp ),
  ], cb );
});


// Fabricator's compiler
gulp.task( 'assembler', ( done ) => {
  assembler({
    logErrors: config.dev,
    dest:      config.tmp,
    helpers,
  });

  done();
});





/** UI libraries *ONLY* routines. */

// Victoria UI Styles
gulp.task( 'styles:toolkit', ( cb ) => {
  pump([
    gulp.src( config.styles.toolkit.src ),
    gulpif( config.dev, sourcemaps.init()),
    sass({
      includePaths: [
        './node_modules',
        neat.includePaths,
        './lib',
      ],
    }),
    prefix(),
    gulpif( config.dev, sourcemaps.write()),
    gulp.dest( config.styles.toolkit.dest ),
    csso(),
    rename( 'toolkit.min.css' ),
    gulp.dest( config.tmp ),
    gulpif( config.dev, browserSync.reload({ stream: true })),
  ], cb );
});


// Layout-related imagery
gulp.task( 'images', gulp.parallel( 'favicon', 'cname', ( cb ) => {
  pump([
    gulp.src( config.images.toolkit.src ),
    imagemin(),
    gulp.dest( config.images.toolkit.dest ),
  ], cb );
}));


// Custom fonts and icon fonts
gulp.task( 'fonts', ( cb ) => {
  pump([
    gulp.src( config.fonts.toolkit.src ),
    gulp.dest( config.fonts.toolkit.dest ),
  ], cb );
});


gulp.task( 'styles', gulp.parallel( 'styles:fabricator', 'styles:toolkit' ));





/** Package(s) versioning. */


/** Initialises special grunt task in a format of 'version:[subtaskName]'. */
function initVersionCommand( subtaskName ) {
  const commandName = `version ${subtaskName ? `:${subtaskName}` : ''}`;

  gulp.task( commandName, ( done ) => {
    const semverType = subtaskName || 'patch',
      newVersion     = semver.inc( config.version, semverType );

    return gulp.src( '{build/release-templates/,.}/package.json' )
      .pipe( bump({ version: newVersion }))
      .pipe( gulp.dest( './' ))
      .on( 'end', () => {
        exec( `git add . && git commit -am "Release of v${newVersion}." && git tag -a v${newVersion} -m "Release of v${newVersion}."`, ( error, okOut, errOut ) => {
          if ( error ) {
            log.error( colours.red( `Sorry - cannot create automatic git tag v${newVersion} and commit the changes. Pleasy, try to do it manually.` ));
            log.error( colours.red( error ));
            log.error( colours.red( errOut ));
          } else {
            log.info( okOut );
            log.info( colours.green( `Version updated to v${newVersion}. Commit ready and tag added - run 'git push && git push --tags' to finish the release by pushing it into 'develop' or 'master' branch.` ));
          }

          done();
        });
      });
  });
}

// 'Bumps' the version of the project to the nearest minor increment.

initVersionCommand(); // Default ~ patch ~ release

initVersionCommand( 'major' );
initVersionCommand( 'minor' );
initVersionCommand( 'patch' );

initVersionCommand( 'premajor' );
initVersionCommand( 'preminor' );
initVersionCommand( 'prepatch' ); initVersionCommand( 'prerelease' );





/** GIT routines. */

gulp.task( 'git:init', ( done ) => {
  git.init({
    cwd: config.dist,
  }, ( error ) => {
    if ( error ) {
      log.error( colours.red( error ));
    }

    done();
  });
});


gulp.task( 'git:cloneReleaseRepo', ( done ) => {
  git.init(
    { cwd: `${config.dist}/${config.version}` },
    ( error ) => {
      if ( error ) {
        log.error( colours.red( error ));
      }

      done();
    }
  );
});


gulp.task( 'git:commitAll', ( cb ) => {
  process.chdir( config.dist );

  pump([
    gulp.src( './*' ),
    git.add({ args: '-f' }),
    git.commit( `Release v${config.version} | [skip ci]` )
  ], cb );
});


gulp.task( 'git:pushToGHPages', ( done ) => {
  git.push( GITHUB_SOURCE_REPO, `master: ${GITHUB_SOURCE_BRANCH}`, {
    args: '--force --quiet ',
  }, ( error ) => {
    if ( error ) {
      log.error( colours.red( error ));
    }

    done();
  });
});


gulp.task( 'git:exec', ( done ) => {

  const FETCH_TAG_CMD = `git fetch origin v${config.version}`,
    PUSH_RELEASE_CMD  = `git reset origin/${GITHUB_RELEASE_BRANCH} && git checkout origin/${GITHUB_RELEASE_BRANCH} -t && git rm -r --cached . && git add . && git commit -am "Release v${config.version}" && git tag -a -m "Release of v${config.version}" v${config.version} && git push origin ${GITHUB_RELEASE_BRANCH} --tags`;

  const PUSH_RELEASE_WITH_RECREATED_TAG_CMD = `git tag -d v${config.version} && git push origin :refs/tags/v${config.version} && ${PUSH_RELEASE_CMD}`;


  log.info( `Executing: ${FETCH_TAG_CMD}` );
  exec( FETCH_TAG_CMD, ( error, okOut, errOut ) => {
    if ( error ) {
      log.warn( error );
      log.warn( errOut );
      log.warn( `Tag 'v${config.version}' does not exist - create new one.` );

      log.info( `Executing: ${PUSH_RELEASE_CMD}` );

      exec( PUSH_RELEASE_CMD, ( releaseErr, releaseOkOut, releaseErrOut ) => {

        if ( releaseErr ) {
          log.error( colours.red( "Release cannot be pushed to the release repository - are you sure there was any changed made to the 'to-be released' files?" ));

          log.error( colours.red( error ));
          log.error( colours.red( releaseErrOut ));
        } else {
          log.info( 'New release commit pushed through with a new tag.' );
          log.info( releaseOkOut );
        }

        done();
      });

    } else {
      log.warn( okOut );
      log.warn( `Tag 'v${config.version}' does exist - replace it!` );

      log.info( `Executing: ${PUSH_RELEASE_WITH_RECREATED_TAG_CMD}` );

      exec( PUSH_RELEASE_WITH_RECREATED_TAG_CMD, ( pushError, pushOkOut, pushErrOut ) => {

        if ( pushError ) {
          log.error( colours.red( pushError ));
          log.error( colours.red( pushErrOut ));
        } else {
          log.info( 'New release commit pushed through with a recreated tag.' );
          log.info( pushOkOut );
        }

        done();
      });
    }

  });
});


gulp.task( 'git:shallowClone', ( done ) => {
  process.chdir( `${config.dist}/${config.version}` );

  const SHALLOW_CLONE_CMD = `git init && git remote add origin ${GITHUB_RELEASE_REPO} && git fetch origin ${GITHUB_RELEASE_BRANCH} --tags`;

  log.info( `Executing: ${SHALLOW_CLONE_CMD}` );

  exec( SHALLOW_CLONE_CMD, ( error, okOut, errOut ) => {

    if ( error ) {
      log.error( colours.red( `Cannot shallow clone the repository ${GITHUB_SOURCE_REPO}...` ));
      log.error( colours.red( error ));
      log.error( colours.red( errOut ));
    } else {
      log.info( 'Shallow clone of the release repo successfully created.' );
      log.info( okOut );
    }

    done();
  });
});





/** Copying and moving tasks. */

gulp.task( 'copyTempToDist', ( cb ) => {
  pump([
    gulp.src( `${config.tmp}/**` ),
    gulp.dest( config.dist ),
  ], cb );
});

// Create latest version
gulp.task( 'copyDistToRelease', ( cb ) => {
  pump([
    gulp.src([ `${config.tmp}/**`, 'build/release-templates/**', 'build/release-templates/.gitignore' ]),
    gulp.dest( `${config.dist}/${config.version}` ),
  ], cb );
});





/** Development helpers and tools. */

gulp.task( 'rebuild:assembler', gulp.series( 'assembler', 'clean:dist', 'rev' ));
gulp.task( 'rebuild:styles', gulp.series( 'styles', 'clean:dist', 'rev' ));
gulp.task( 'rebuild:scripts', gulp.series( 'scripts', 'clean:dist', 'rev' ));
gulp.task( 'rebuild:images', gulp.series( 'images', 'clean:dist', 'rev' ));
gulp.task( 'rebuild:fonts', gulp.series( 'fonts', 'clean:dist', 'rev' ));





// Serving & Source wathing
gulp.task( 'serveAndWatch', () => {

  browserSync({
    server: {
      baseDir: config.dist,
    },
    notify:    false,
    logPrefix: 'FABRICATOR',
  });

  gulp.task( 'assembler:watch', gulp.series( 'rebuild:assembler', browserSync.reload ));
  gulp.watch( config.templates.watch, gulp.series( 'assembler:watch' ));

  gulp.task( 'styles:watch', gulp.series( 'rebuild:styles', browserSync.reload ));
  gulp.watch([ config.styles.fabricator.watch, config.styles.toolkit.watch ], gulp.series( 'styles:watch' ));

  gulp.task( 'scripts:watch', gulp.series( 'rebuild:scripts', browserSync.reload ));
  gulp.watch([ config.scripts.fabricator.watch, config.scripts.toolkit.watch ], gulp.series( 'scripts:watch' ));

  gulp.task( 'images:watch', gulp.series( 'rebuild:images', browserSync.reload ));
  gulp.watch( config.images.toolkit.watch, gulp.series( 'images:watch' ));

  gulp.task( 'fonts:watch', gulp.series( 'rebuild:fonts', browserSync.reload ));
  gulp.watch( config.fonts.toolkit.src, gulp.series( 'fonts:watch' ));

});





/** Standard build & deployment tasks. */


gulp.task( 'build', gulp.series( 'clean', 'styles', 'scripts', 'images', 'fonts', 'assembler', 'decorate' ));

gulp.task( 'release:dev', gulp.series( 'build', 'rev', 'git:init', 'git:commitAll', 'git:pushToGHPages' ));

gulp.task( 'release:prod', gulp.series( 'build', 'copyTempToDist', 'copyDistToRelease', 'git:shallowClone', 'git:exec' ));

gulp.task( 'serve', gulp.series( 'build', 'rev', 'serveAndWatch' ));

// DEFAULT build task (alias to 'serve')
gulp.task( 'default', gulp.series( 'serve' ));
