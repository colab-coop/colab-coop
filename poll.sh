while true;
do
  git pull 2>> pollerr.log;
  gulp;
  sleep 5m;
done