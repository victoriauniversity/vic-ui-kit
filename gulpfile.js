/** Dependencies imports. */

const assembler = require('fabricator-assemble'),
fs              = require( 'fs' ),
browserSync     = require('browser-sync'),
csso            = require('gulp-csso'),
del             = require('del'),
gulp            = require('gulp'),
gutil           = require('gulp-util'),
gulpif          = require('gulp-if'),
git             = require('gulp-git'),
helpers         = require('handlebars-helpers')(),
imagemin        = require('gulp-imagemin'),
prefix          = require('gulp-autoprefixer'),
rename          = require('gulp-rename'),
reload          = browserSync.reload,
runSequence     = require('run-sequence'),
sass            = require('gulp-sass'),
sourcemaps      = require('gulp-sourcemaps'),
webpack         = require('webpack'),
revAll          = require('gulp-rev-all'),
exec            = require('child_process').exec,
header          = require('gulp-header'),




/** Build directories. */

DIR_TMP  = '.tmp',
DIR_DIST = 'dist',


/** Project settings. */


// Repositories

GITHUB_SECRET_TOKEN = process.env.GITHUB_TOKEN || '', // Environmental variable `GITHUB_TOKEN` has to be set up on the CI or within the user's environment to make the builds successful!

GITHUB_RELEASE_REPO   = 'https://' + GITHUB_SECRET_TOKEN + '@github.com/victoriauniversity/victoria-ui-releases.git',
GITHUB_RELEASE_BRANCH = 'releases',
GITHUB_SOURCE_REPO    = 'https://' + GITHUB_SECRET_TOKEN + '@github.com/victoriauniversity/vuw-styleguide.git',
GITHUB_SOURCE_BRANCH  = 'gh-pages';


// Build information

packageJSON = JSON.parse( fs.readFileSync( './package.json'), 'utf8' ) || {}, // See package.json for more details


/** Main configuration object. */

config = {
  host: 'https/localhost:3000', // 'http' or 'https' *ONLY* //TODO: Should be environment-based!
  version: packageJSON.version,
  pkg: packageJSON,
  dev: gutil.env.dev,
  styles: {
    browsers: 'last 1 version',
    fabricator: {
      src:   'src/assets/fabricator/styles/fabricator.scss',
      dest:  DIR_TMP + '/styleguide-assets',
      watch: 'src/assets/fabricator/styles/**/*.scss',
    },
    toolkit: {
      src:   'src/assets/toolkit/styles/toolkit.scss',
      dest:  DIR_TMP,
      watch: 'src/assets/toolkit/styles/**/**/*.scss',
    }
  },
  scripts: {
    fabricator: {
      src:        './src/assets/fabricator/scripts/fabricator.js',
      pathInDest: '/styleguide-assets/f', // *MUST BE* without a .js extension
      watch:      'src/assets/fabricator/scripts/**/*',
    },
    toolkit: {
      src:        './src/assets/toolkit/scripts/toolkit.js',
      pathInDest: 'toolkit',  // *MUST BE* without a .js extension
      watch:      'src/assets/toolkit/scripts/**/*',
    }
  },
  images: {
    toolkit: {
      src: [
        'src/assets/toolkit/images/**/*',
        'src/favicon.ico'
      ],
      dest:  DIR_TMP + '/images',
      watch: 'src/assets/toolkit/images/**/*',
    }
  },
  fonts: {
    toolkit: {
      src:   'src/assets/toolkit/fonts/*',
      dest:  DIR_TMP + '/fonts',
      watch: 'src/assets/toolkit/fonts/**/*'
    }
  },
  templates: {
    watch: 'src/**/*.{html,md,json,yml}',
  },
  dist: DIR_DIST,
  tmp: DIR_TMP
},

BUILD_TIME = new Date(),
BUILD_MSG = 'Version: ' + config.version + ' ' +
  ( process.env.CI_COMMIT_ID ? '(build #' + process.env.CI_COMMIT_ID + ') ' : '' ) +
  '| ' + BUILD_TIME.toDateString() + ' ' + BUILD_TIME.getHours() + ':' + ( '0' + BUILD_TIME.getMinutes() ).slice( -2 ),


// Pack scripts using WebPack
webpackConfig = require('./build/webpack.config')(config);





/** Shared (Fabricator + App) routines. */

// Temporary and distribution directories cleanup
gulp.task('clean', del.bind(null, [config.tmp, config.dist]));


// JavaScripts compiled by WebPack
gulp.task('scripts', (done) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      gutil.log(gutil.colors.red(err()));
    }

    const result = stats.toJson();

    if (result.errors.length) {
      result.errors.forEach((error) => {
        gutil.log(gutil.colors.red(error));
      });
    }

    done();
  });
});


gulp.task('styles', ['styles:fabricator', 'styles:toolkit']);


// Files revver
gulp.task('rev', () => {
  return gulp.src( config.tmp + '/**')
    .pipe( revAll.revision({
      //prefix: HOST,
      // hashLength: 8, // Default = 8
      //www.npmjs.com/package/gulp-rev-all#options
      includeFilesInManifest: ['.js', '.css', '.svg', '.woff', '.woff2', '.ttf', '.ico'],
      dontRenameFile: [
        '.html'
      ],
      dontUpdateReference: [
        '.html'
      ]
    }))
    .pipe( gulp.dest( config.dist ));
});


gulp.task( 'decorate:templates', () => {

  return gulp.src( config.tmp + '/**/*.html' ) // HTML
    .pipe( header( '<!-- ' + BUILD_MSG + ' -->\n'))
    .pipe( gulp.dest( config.tmp ) );
});


gulp.task( 'decorate:assets', () => {
  return gulp.src( config.tmp + '/*.{js,css}' ) // JS + CSS
    .pipe( header( '/** ' + BUILD_MSG + ' */\n') )
    .pipe( gulp.dest( config.tmp ) );
});

gulp.task( 'decorate', ['decorate:assets', 'decorate:templates'], ( done ) => {
  done();
  return;
});





/** StyleGuide (Fabricator) *ONLY* routines. */

// Fabricator's styles
gulp.task('styles:fabricator', () => {
  gulp.src(config.styles.fabricator.src)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(prefix('last 1 version'))
  .pipe(gulpif(!config.dev, csso()))
  .pipe(rename('f.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.styles.fabricator.dest))
  .pipe(gulpif(config.dev, reload({ stream: true })));
});


// Style guide's icon
gulp.task('favicon', () => {
  return gulp.src('src/favicon.ico')
  .pipe(gulp.dest(config.tmp));
});


// Fabricator's compiler
gulp.task('assembler', (done) => {
  assembler({
    logErrors: config.dev,
    dest:      config.tmp,
    helpers:   helpers,
  });

  done();
});





/** UI libraries *ONLY* routines. */

// Victoria UI Styles
gulp.task('styles:toolkit', () => {
  gulp.src(config.styles.toolkit.src)
  .pipe(gulpif(config.dev, sourcemaps.init()))
  .pipe(sass({
    includePaths: [
    './node_modules',
    require("bourbon").includePaths,
    require("bourbon-neat").includePaths,
    './lib',
    ],
  }).on('error', sass.logError))
  .pipe(prefix('last 1 version'))
  .pipe(gulpif(!config.dev, csso()))
  .pipe(gulpif(config.dev, sourcemaps.write()))
  .pipe(gulp.dest(config.styles.toolkit.dest))
  .pipe(gulpif(config.dev, reload({ stream: true })));
});


// Layout-related imagery
gulp.task('images', ['favicon'], () => {
  return gulp.src(config.images.toolkit.src)
    .pipe(imagemin())
    .pipe(gulp.dest(config.images.toolkit.dest));
});


// Custom fonts and icon fonts
gulp.task('fonts', function () {
  return gulp.src(config.fonts.toolkit.src)
    .pipe(gulp.dest( config.fonts.toolkit.dest ));
});





/** GIT routines. */

gulp.task( 'git:init', function( done ) {
   git.init({
      cwd: config.dist
    }, function( err ) {
      done();
   });
});


gulp.task( 'git:cloneReleaseRepo', function( done ) {
   git.init(
    { cwd: config.dist + '/' + config.version },
    function( error ) {
      if ( error ){
        gutil.log(gutil.colors.red(error));
      }

      done();
   });
});


gulp.task('git:commitAll', function(){
  process.chdir(config.dist );

  return gulp.src( './*' )
    .pipe( git.add( { args: '-f'} ) )
    .pipe( git.commit( 'Release v' + config.version + ' | [skip ci]' ));
});


gulp.task( 'git:pushToGHPages', function( done ) {
  git.push( GITHUB_SOURCE_REPO, 'master:' + GITHUB_SOURCE_BRANCH, {
    args: '--force --quiet '
  }, function( error ) {
    if ( error ){
      gutil.log(gutil.colors.red(error));
    }

    done();
  });

});


gulp.task( 'git:exec', ( done ) => {

  const FETCH_TAG_CMD = 'git fetch origin v' + config.version,
  PUSH_RELEASE_CMD    = 'git reset origin/' + GITHUB_RELEASE_BRANCH + ' && git checkout origin/' + GITHUB_RELEASE_BRANCH +' -t && git rm -r --cached . && git add . && git commit -am "Release v' + config.version + '" && git tag -a -m "Release of v' + config.version + '" v' + config.version + ' && git push origin ' + GITHUB_RELEASE_BRANCH + ' --tags';

  const PUSH_RELEASE_WITH_RECREATED_TAG_CMD = 'git tag -d v' + config.version + ' && git push origin :refs/tags/v' + config.version + ' && ' + PUSH_RELEASE_CMD;


  gutil.log( 'Executing: ' + FETCH_TAG_CMD );
  exec( FETCH_TAG_CMD, function ( error, okOut, errOut ) {

    if ( error ){
      gutil.log( error );
      gutil.log( errOut );
      gutil.log( 'Tag `v' + config.version + '` does not exist - create new one.');

      gutil.log( 'Executing: ' + PUSH_RELEASE_CMD );

      exec( PUSH_RELEASE_CMD, function ( error, okOut, errOut ) {

        if ( error ){
          gutil.log( gutil.colors.red( "Release cannot be pushed to the release repository - are you sure there was any changed made to the 'to-be released' files?" ));

          gutil.log(gutil.colors.red(error));
          gutil.log(gutil.colors.red(errOut));
        } else {
          gutil.log( 'New release commit pushed through with a new tag.' );
          gutil.log( okOut );
        }

        done();
      });

    } else {
      gutil.log( okOut );
      gutil.log( 'Tag `v' + config.version + '` does exist - replace it!');

      gutil.log( 'Executing: ' + PUSH_RELEASE_WITH_RECREATED_TAG_CMD );

      exec( PUSH_RELEASE_WITH_RECREATED_TAG_CMD, function ( error, okOut, errOut ) {

        if ( error ){
          gutil.log(gutil.colors.red(error));
          gutil.log(gutil.colors.red(errOut));
        } else {
          gutil.log( 'New release commit pushed through with a recreated tag.' );
          gutil.log( okOut );
        }

        done();
      });
    }

  });
});


gulp.task('git:shallowClone', ( done ) => {
  process.chdir( config.dist + '/' + config.version );

  const SHALLOW_CLONE_CMD = 'git init && git remote add origin ' + GITHUB_RELEASE_REPO + ' && git fetch origin ' + GITHUB_RELEASE_BRANCH + ' --tags';

  gutil.log( 'Executing: ' + SHALLOW_CLONE_CMD );

  exec( SHALLOW_CLONE_CMD, function ( error, okOut, errOut ) {

    if ( error ){
      gutil.log(gutil.colors.red( 'Cannot shallow clone the repository ' + GITHUB_SOURCE_REPO + '...' ));
      gutil.log(gutil.colors.red(error));
      gutil.log(gutil.colors.red(errOut));
    } else {
      gutil.log( 'Shallow clone of the release repo successfully created.' );
      gutil.log( okOut );
    }

    done();
  });
});





/** Copying and moving tasks. */

gulp.task('copyTempToDist', () => {

  // Create latest
  return gulp.src( config.tmp + '/**' )
    .pipe( gulp.dest( config.dist ) );

});


gulp.task('copyDistToRelease', () => {

  // Create latest version
  return gulp.src( [ config.tmp + '/**', 'build/release-templates/**', 'build/release-templates/.gitignore' ] )
    .pipe( gulp.dest( config.dist + '/' + config.version  ) );

});





/** Development helpers and tools. */

// Serving & Source wathing
gulp.task( 'serveAndWatch', () => {

  browserSync({
    server: {
      baseDir: config.dist,
    },
    notify:    false,
    logPrefix: 'FABRICATOR',
  });

  gulp.task('assembler:watch', ['assembler', 'rev'], browserSync.reload);
  gulp.watch(config.templates.watch, ['assembler:watch']);

  gulp.task('styles:watch', ['styles', 'rev']);
  gulp.watch([config.styles.fabricator.watch, config.styles.toolkit.watch], ['styles:watch']);

  gulp.task('scripts:watch', ['scripts', 'rev'], browserSync.reload);
  gulp.watch([config.scripts.fabricator.watch, config.scripts.toolkit.watch], ['scripts:watch']);

  gulp.task('images:watch', ['images', 'rev'], browserSync.reload);
  gulp.watch(config.images.toolkit.watch, ['images:watch']);

  gulp.task('fonts:watch', ['fonts', 'rev'], reload);
  gulp.watch(config.fonts.toolkit.src, ['fonts:watch']);

});





/** Standard build & deployment tasks. */


gulp.task( 'build', ['clean'], ( done ) => {
  runSequence(
    'styles',
    'scripts',
    'images',
    'fonts',
    'assembler',
    'decorate',
    () => {
      done();
    }
  );
});


gulp.task( 'release:dev', ( done ) => {

  runSequence(
    'build',
    'rev', // Revv all the static files
    'git:init',
    'git:commitAll',
    'git:pushToGHPages',
    () => {
      done();
  });

});


gulp.task( 'release:prod', ( done ) => {

  runSequence(
    'build',
    'copyTempToDist',
    'copyDistToRelease',
    'git:shallowClone',
    'git:exec',
    () => {
      done();
  });

});


gulp.task( 'serve', () => {

  // run build
  runSequence(
    'build',
    'rev',
    'serveAndWatch' );

});


// default build task (alias to 'serve')
gulp.task('default', () => {
  gulp.start( 'serve' );
});
