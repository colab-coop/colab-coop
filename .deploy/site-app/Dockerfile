FROM node:8

RUN apt-get update

RUN apt-get install -y ruby-full nginx git unzip supervisor rsync nano wget curl

RUN gem install compass --pre
COPY .deploy/site-app/nginx.conf /etc/nginx/nginx.conf
COPY .deploy/site-app/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
COPY . /app

RUN npm install && npm run build

ENTRYPOINT /app/.deploy/site-app/entrypoint.sh
