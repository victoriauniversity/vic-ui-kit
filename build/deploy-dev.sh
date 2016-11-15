#!/bin/bash


## CAN BE MOVED TO run-tests.sh when there's some code!

# By default we use the Node.js version set in your package.json or the latest
# version from the 0.10 release
#
# You can use nvm to install any Node.js (or io.js) version you require.
#nvm install 6.2.0
npm install



# Development tasks
echo 'Running development-specific build & deployment...'

npm run release-dev
