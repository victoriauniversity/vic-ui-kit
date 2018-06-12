/**
 * Versioning and CVS-tagging.
 */


/** Imports. */

const
  gulp     = require( 'gulp' ),
  pump     = require( 'pump' ),
  colours  = require( 'ansi-colors' ),
  log      = require( 'fancy-log' ),
  bump     = require( 'gulp-bump' ),
  semver   = require( 'semver' ),
  exec     = require( 'child_process' ).exec,

  config = require( '../build.config' );



/** Tasks. */

// Initialises special grunt task in a format of 'version:[subtaskName]'.
function addVersionTask( subtaskName ) {
  const commandName = `version${subtaskName ? `:${subtaskName}` : ''}`;

  gulp.task( commandName, ( done ) => {
    const semverType = subtaskName || 'patch',
      newVersion     = semver.inc( config.version, semverType );

    function gitCommitWithVersionTag() {
      exec( `git add . && git commit -am "Release of v${newVersion}." && git tag -a v${newVersion} -m "Release of v${newVersion}."`, ( error, okOut, errOut ) => {
        if ( error ) {
          log.error( colours.red( `Sorry - cannot create automatic git tag v${newVersion} and commit the changes. Pleasy, try to do it manually.` ));
          log.error( colours.red( error ));
          log.error( colours.red( errOut ));
        } else {
          log.info( okOut );
          log.info( colours.green( `Version updated to v${newVersion}. Commit ready and tag added - run 'git push && git push --tags' to finish the release by pushing it into 'dev' or 'master' branch.` ));
        }

        done();
      });
    }

    pump([
      gulp.src( `{${config.paths.releaseStatics},${config.paths.root}}/package.json` ),
      bump({ version: newVersion }),
      gulp.dest( `${config.paths.root}/` ),
    ]);

    gitCommitWithVersionTag();
  });
}



/** Name & register tasks. */

// 'Bumps' the version of the project to the nearest minor increment.
addVersionTask(); // Default ~ patch ~ release

addVersionTask( 'major' );
addVersionTask( 'minor' );
addVersionTask( 'patch' );

addVersionTask( 'premajor' );
addVersionTask( 'preminor' );
addVersionTask( 'prepatch' ); addVersionTask( 'prerelease' );
