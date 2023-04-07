#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

cd ${DIR}
git fetch

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "master" && "$BRANCH" != "develop" ]]; then
  echo "not valid branch"
  exit 0
fi

BRANCH_DIFF=$(git diff origin/${BRANCH})
if [[ -n "$BRANCH_DIFF" ]]; then
  echo "$(date) Updating content from ${BRANCH}" >> pollerr.log
  git reset --hard origin/${BRANCH}
  gulp
fi
