/**
 * Assembler for the Fabricator.
 */


/** Imports. */

const
  gulp      = require( 'gulp' ),
  assembler = require( 'fabricator-assemble' ),
  helpers   = require( 'handlebars-helpers' )(),

  config    = require( '../build.config' );



/** Tasks. */

function assembleFabricator( done ) {
  assembler({
    logErrors: config.dev,
    dest:      config.paths.tmp,
    helpers,
  });

  done();
}



/** Name & register tasks. */

// Fabricator's compiler
gulp.task( 'assemble:fabricator', assembleFabricator );
