#!/bin/bash


if [ ${TRAVIS_BRANCH} = master ] ; then
	# production
  bash ./deploy-production.sh
fi



if [ ${TRAVIS_BRANCH} = develop ] ; then
  # developmenet
  bash ./deploy-development.sh

fi


if [ ${TRAVIS_BRANCH} != develop && ${TRAVIS_BRANCH} != master ] ; then
  # no branch
  echo "Nothing deployable, ending CI build."

fi
