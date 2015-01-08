while true;
do
  git pull 2>> pollerr.log;
  gulp 2>> gulperr.log;
  sleep 5m;
done
