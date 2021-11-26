#!/bin/sh
# release a new version of the app

# stop if there is an error
set -e

REGEX_VERSION="^[0-9]+\.[0-9]+\.[0-9]+$"

# Gets the version specified as argument, or fails if none provided
NEW_VERSION="$1"
shift

BRANCH=$(git symbolic-ref --short HEAD)

VERSION_1=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

VERSION_2=$(cat libs/material-file-input/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

# Pre-requisite checks
echo "> pre-requisites..."
if test "${VERSION_1}" != "${VERSION_2}"; then
    echo "/!\ Current version is inconsistent, aborting (${VERSION_1} != ${VERSION_2})"
    exit 1
fi
if test "${BRANCH}" != "master"; then
    echo "/!\ Not on master branch (${BRANCH})"
    exit 1
fi
if ! [[ "$NEW_VERSION" =~ $REGEX_VERSION ]]; then
    echo "/!\ Expected version is invalid (${NEW_VERSION})"
    exit 1
fi
# check if new version is valid
CURV=(${VERSION_1//\./ })
NEWV=(${NEW_VERSION//\./ })
echo "> Testing new version ${NEW_VERSION} against ${VERSION_1}"
if (( ${CURV[0]} == ${NEWV[0]} )); then
    if (( ${CURV[1]} == ${NEWV[1]} )); then
        # Testing patch version
        if (( ${CURV[2]} == ${NEWV[2]} )); then
          echo "/!\ Version is the same"
          exit 1
        elif (( ${CURV[2]} + 1 == ${NEWV[2]} )); then
            echo "New PATCH version"
        else
            echo "/!\ Invalid patch version"
            exit 1
        fi
    elif (( ${CURV[1]} + 1 == ${NEWV[1]} )); then
        # Testing minor version
        if (( ${NEWV[2]} == 0 )); then
            echo "New MINOR version"
        else
            echo "/!\ Invalid minor version, 0 needed"
            exit 1
        fi
    else
        echo "/!\ Invalid minor version"
        exit 1
    fi
elif (( ${CURV[0]} + 1 == ${NEWV[0]} )); then
      # Testing consistent major
      if (( ${NEWV[1]} == 0 && ${NEWV[2]} == 0 )); then
          echo "New MAJOR version"
      else
          echo "/!\ Invalid major version, 0 needed"
          exit 1
      fi
else
    echo "/!\ Invalid version"
    exit 1
fi
echo "> pre-requisites OK"

while true; do
    read -p "Do you wish to release (y/n)? " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

echo "> Testing library"
npm run lint
npm run test:once

# Release setup

echo "> Setting version (${NEW_VERSION})"
# need to add '' on OSX
sed -i '' 's/"version": "'${VERSION_1}'"/"version": "'${NEW_VERSION}'"/g' libs/material-file-input/package.json
npm --no-git-tag-version version "${NEW_VERSION}"

echo "> Building application artifact"
npm run clean
npm run build:lib

echo "> Commit release version"
git add package.json package-lock.json libs/material-file-input/package.json
git commit -m "Release version ${NEW_VERSION}"

echo "> Tag release version"
git tag -a "v${NEW_VERSION}" -m "Tag version ${NEW_VERSION}"

echo "> Publishing to npm"
npm run publish:lib

echo "> Pushing changes to origin"
git push --set-upstream origin ${BRANCH}

echo "> Pushing tag to origin"
git push --tags

echo "> Tag SUCCESSFUL !"
