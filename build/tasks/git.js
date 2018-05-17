/**
 * VCS-related operations.
 */


/** Imports. */

const
  gulp     = require( 'gulp' ),
  pump     = require( 'pump' ),
  git      = require( 'gulp-git' ),
  colours  = require( 'ansi-colors' ),
  log      = require( 'fancy-log' ),
  { exec } = require( 'child_process' ).exec,

  config = require( '../build.config' );



/** Repository information. */

const GITHUB_SECRET_TOKEN = process.env.GITHUB_TOKEN || '', // Environmental variable `GITHUB_TOKEN` has to be set up on the CI or within the user's environment to make the builds successful!

  GITHUB_RELEASE_REPO     = `https://${GITHUB_SECRET_TOKEN}@github.com/victoriauniversity/victoria-ui-releases.git`,
  GITHUB_RELEASE_BRANCH   = 'releases',
  GITHUB_SOURCE_REPO      = `https://${GITHUB_SECRET_TOKEN}@github.com/victoriauniversity/vic-ui-kit.git`,
  GITHUB_SOURCE_BRANCH    = 'gh-pages';

/** Tasks. */

function gitInit( done ) {
  git.init({
    cwd: config.paths.dist,
  }, ( error ) => {
    if ( error ) {
      log.error( colours.red( error ));
    }

    done();
  });
}

function gitCloseReleaseRepo( done ) {
  git.init({
    cwd: `${config.paths.dist}/${config.version}`,
  }, ( error ) => {
    if ( error ) {
      log.error( colours.red( error ));
    }

    done();
  });
}

function gitCommitAll( done ) {
  process.chdir( config.paths.dist );

  return pump([
    gulp.src( './*' ),
    git.add({ args: '-f' }),
    git.commit( `Release v${config.version} | [skip ci]` ),
  ], done );
}

function gitPushToGitHubPages( done ) {
  git.push( GITHUB_SOURCE_REPO, GITHUB_SOURCE_BRANCH, {
    args: '--force --quiet ',
  }, ( error ) => {
    if ( error ) {
      log.error( colours.red( error ));
    }

    done();
  });
}

function gitExecute( done ) {
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
}

function gitShallowClone( done ) {
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
}



/** Name & register tasks. */

gulp.task( 'git:init', gitInit );
gulp.task( 'git:cloneReleaseRepo', gitCloseReleaseRepo );
gulp.task( 'git:commitAll', gitCommitAll );
gulp.task( 'git:pushToGHPages', gitPushToGitHubPages );
gulp.task( 'git:exec', gitExecute );
gulp.task( 'git:shallowClone', gitShallowClone );
