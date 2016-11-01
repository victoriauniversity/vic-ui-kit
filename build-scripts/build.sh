#!/bin/bash


if [ ${TRAVIS_BRANCH} = master ] ; then
	# production
  bash ./deploy-production.sh
fi



if [ ${TRAVIS_BRANCH} = develop ] ; then
  # developmenet
  bash ./deploy-development.sh

fi
