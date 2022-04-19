FROM ubuntu

RUN apt-get update

RUN apt-get install -y ruby-full nginx git unzip supervisor rsync nano wget curl

RUN gem install compass --pre

RUN curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
COPY . /app

RUN . /root/.nvm/nvm.sh && \
    . /root/.nvm/bash_completion && \
    nvm install 8 && \
    npm install && \
    npm run build

COPY .deploy/site-app/nginx.conf /etc/nginx/nginx.conf
COPY .deploy/site-app/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

ENTRYPOINT /app/.deploy/site-app/entrypoint.sh
