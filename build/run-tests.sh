#!/bin/bash

# npm test
# grunt test

echo "No tests to run yet. Skipping to build & deployment..."

# Required for deployment
git config --global user.email "codeship-ci@codeship.com"
git config --global user.name "CodeShip CI"
