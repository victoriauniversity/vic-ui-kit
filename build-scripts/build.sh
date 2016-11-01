#!/bin/bash


if [ ${TRAVIS_BRANCH} = master ] ; then
	# production
  bash ./deploy-production.sh
  exit 0
fi



if [ ${TRAVIS_BRANCH} = enhancements-jl-deployment ] ; then
  # developmenet
  bash ./deploy-development.sh
  exit 0

fi


echo "Nothing deployable, ending CI build."
