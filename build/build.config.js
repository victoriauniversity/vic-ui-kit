/**
 * Gulpfile's configuration.
 *
 * All paths are relative to the root directory and gulpfile.js.
 */


/** Imports. */

const fs = require( 'fs' );



/** Config helpers. */

// Constants to help maintain DRY principle
const DIR = {
  FABRICATOR: 'src/assets/fabricator',
  TOOLKIT:    'src/assets/toolkit',
  SRC:        'src',
  BUILD:      'build',
};


const args = require( 'minimist' )( process.argv.slice( 2 )), // Command line arguments
  npmPackage = JSON.parse( fs.readFileSync( './package.json' ), 'utf8' ) || {}; // Turn package.json into JSON



/** Configuration. */

const config = {
  version: npmPackage.version,
  npmPackage, // See package.json for more details

  // Build mode: {development|production} - True if *not* run with `--prod`
  devMode: Boolean( !args.prod ),

  runningServer: null,

  paths: {
    root: '.',
    tmp:  '.tmp',
    dist: 'dist',
    src:  DIR.SRC,

    fabricator: {
      scripts: `${DIR.FABRICATOR}/scripts`,
      sass:    `${DIR.FABRICATOR}/styles`,

      scriptIndex: `${DIR.FABRICATOR}/scripts/fabricator.js`,
      sassIndex:   `${DIR.FABRICATOR}/styles/fabricator.scss`,
      favicon:     `${DIR.SRC}/favicon.ico`,
    },

    toolkit: {
      scripts: `${DIR.TOOLKIT}/scripts`,
      sass:    `${DIR.TOOLKIT}/styles`,
      images:  `${DIR.TOOLKIT}/images`,
      fonts:   `${DIR.TOOLKIT}/fonts`,

      scriptsIndex: `${DIR.TOOLKIT}/scripts/toolkit.js`,
      sassIndex:    `${DIR.TOOLKIT}/styles/toolkit.scss`,
    },

    releaseStatics: `${DIR.BUILD}/release-templates`,

    githubCname:   `${DIR.SRC}/CNAME`, // Required for deployment into GitHub pages
  },

  extensions: {
    images:    '.*',
    templates: '.{html,md,json,yml}',
    scripts:   '.js',
    maps:      '.map',
    fonts:     '.*',
    sass:      '.{scss,sass}',
    styles:    '.css',
  },

  // Build environments: {local|stage|production}
  env: {
    development: { // Local
      name:   'development',
      server: {
        protocol: 'https',
        host:     'localhost',
        port:     3000,
      },
    },
    stage: {
      name:   'stage',
      server: {
        protocol: 'http',
        host:     'dev-static.victoria.ac.nz',
        port:     80,
      },
    },
    production: {
      name:   'production',
      server: {
        protocol: 'https',
        host:     'static.victoria.ac.nz',
        port:     443,
      },
    },
  },

  /** Public helper methods. */
  isProduction: () => process.env.NODE_ENV === config.env.prod.name,
  isStage:      () => process.env.NODE_ENV === config.env.stage.name,
  isLocal:      () => process.env.NODE_ENV === config.env.local.name,
  getEnvConfig: () => config.env[process.env.NODE_ENV],

};



module.exports = config;
