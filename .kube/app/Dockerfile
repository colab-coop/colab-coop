FROM node:16

ENV APP_DIR /app
ENV KUBE_DIR .kube/app

RUN apt-get update
RUN apt-get install -y ruby-full nginx git unzip supervisor rsync nano wget curl s3cmd

COPY $KUBE_DIR/nginx.conf /etc/nginx/nginx.conf
COPY $KUBE_DIR/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN mkdir $APP_DIR
WORKDIR $APP_DIR
COPY . $APP_DIR

RUN gem install compass --pre

RUN npm install && npm run build

ENTRYPOINT $APP_DIR/$KUBE_DIR/entrypoint.sh
