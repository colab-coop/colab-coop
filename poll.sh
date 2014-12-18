while true;
do
  git pull 2>> pollerr.log;
  sleep 5m;
done