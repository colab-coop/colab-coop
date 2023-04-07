#!/bin/sh

set -e

mkdir -p $FILES_PATH
mkdir -p $FILES_PATH/uploads

rm -rf /app/web/wp-content
ln -s $FILES_PATH /app/web/wp-content

if [ ! -f $FILES_PATH/../deploy.lock ]
then

  touch $FILES_PATH/../deploy.lock

  rsync -a /app/themes/ $FILES_PATH/themes/
  rsync -a /app/plugins/ $FILES_PATH/plugins/

  chown www-data:root $FILES_PATH/ -R
  
fi

rm -rf $FILES_PATH/../deploy.lock

/usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
