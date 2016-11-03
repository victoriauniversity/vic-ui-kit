#!/bin/bash

# Environment independent commands





# PRODUCTION-specific build & deployment
if [ $TRAVIS_BRANCH = 'master' ] ; then

  bash ./build-scripts/deploy-production.sh
  exit 0

# DEVELOPMENT-specific build & deployment
else

  bash ./build-scripts/deploy-development.sh
  exit 0

fi





# NO specific d
echo "Nothing deployable, ending CI build."
