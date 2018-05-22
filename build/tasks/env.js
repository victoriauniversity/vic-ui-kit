/**
 * Set correct build environment.
 */


/** Imports. */

const
  gulp = require( 'gulp' ),

  config = require( '../build.config' );



/** Defaults. */

process.env.NODE_ENV = process.env.NODE_ENV || config.env.development.name;



/** Tasks. */

function setProductionEnvironment( done ) {
  process.env.NODE_ENV = config.env.production.name;
  done();
}

function setStageEnvironment( done ) {
  process.env.NODE_ENV = config.env.stage.name;
  done();
}



/** Register gulp tasks. */

gulp.task( 'setEnv:prod', setProductionEnvironment );
gulp.task( 'setEnv:stage', setStageEnvironment );
