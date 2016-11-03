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



/** Build directories. */

DIR_TMP  = '.tmp',
DIR_DIST = 'dist',


/** Project settings. */

// Repositories //TODO: Set tokens as environment variables
GITHUB_RELEASE_REPO  = 'https://947373604c9cb264bca42c1c4ebe126b09f37f6c@github.com/victoriauniversity/victoria-ui-releases.git'
GITHUB_SOURCE_REPO   = 'https://947373604c9cb264bca42c1c4ebe126b09f37f6c@github.com/victoriauniversity/vuw-styleguide.git',
GITHUB_SOURCE_BRANCH = 'test';


packageJSON = JSON.parse( fs.readFileSync('./package.json'), 'utf8' ) || {}, // See package.json for more details


/** Environmental configuration. */



/** Main configuration object. */

config = {
  host: 'https/localhost:3000', // 'http' or 'https' *ONLY* //TODO: Should be environment-based!
  version: packageJSON.version + '-test',
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
};


// Pack scripts using WebPack
const webpackConfig = require('./build/webpack.config')(config);





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
gulp.task('rev', function() {
  gulp
    .src( config.tmp + '/**')
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
      cwd: config.dist + '/' + config.version
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
  process.chdir(config.dist + '/' + config.version );

  return gulp.src( './*' )
    .pipe( git.add( { args: '-f'} ) )
    .pipe( git.commit( 'Release v' + config.version ));
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


gulp.task('git:exec', ( done ) => {
  process.chdir( config.dist + '/' + config.version );

  exec( 'git init && git remote add origin ' + GITHUB_SOURCE_REPO + ' && git fetch origin ' + GITHUB_SOURCE_BRANCH + ' && git fetch origin --tags && git reset origin/' + GITHUB_SOURCE_BRANCH + ' && git checkout -t origin/' + GITHUB_SOURCE_BRANCH +' && git rm -r --cached . && git add . && git tag -d v' + config.version + ' && git push origin :refs/tags/v' + config.version + ' && git commit -am "Release v' + config.version + '" && git tag -a -m "Release of v' + config.version + '" v' + config.version + ' && git push origin ' + GITHUB_SOURCE_BRANCH + ' --tags', function ( error, okOut, errOut ) {

    if ( error ){
      gutil.log(gutil.colors.red(error));
      gutil.log(gutil.colors.red(errOut));
    } else {
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
gulp.task('serve', () => {

  browserSync({
    server: {
      baseDir: config.dist,
    },
    notify:    false,
    logPrefix: 'FABRICATOR',
  });

  gulp.task('assembler:watch', ['assembler'], browserSync.reload);
  gulp.watch(config.templates.watch, ['assembler:watch']);

  gulp.task('styles:watch', ['styles']);
  gulp.watch([config.styles.fabricator.watch, config.styles.toolkit.watch], ['styles:watch']);

  gulp.task('scripts:watch', ['scripts'], browserSync.reload);
  gulp.watch([config.scripts.fabricator.watch, config.scripts.toolkit.watch], ['scripts:watch']);

  gulp.task('images:watch', ['images'], browserSync.reload);
  gulp.watch(config.images.toolkit.watch, ['images:watch']);

  gulp.task('fonts:watch', ['fonts'], reload);
  gulp.watch(config.fonts.toolkit.src, ['fonts:watch']);

});





/** Standard build & deployment tasks. */

gulp.task('release:dev', ( done ) => {

  runSequence(
    'git:init',
    'git:commitAll',
    'git:pushToGHPages',
    () => {
      done();
  });

});


gulp.task('release:prod', ( ) => {


});


// default build task
gulp.task('default', ['clean'], () => {

  // define build tasks
  const tasks = [
    'styles',
    'scripts',
    'images',
    'fonts',
    'assembler'
  ];

  // run build
  runSequence(tasks,
    'copyTempToDist',
    'copyDistToRelease',
    'git:exec',
    () => {

    // Revv all the static files
    //gulp.run( 'rev' );
    //

    if (config.dev) {
      gulp.start('serve');
    } else {

    }
  });

});
