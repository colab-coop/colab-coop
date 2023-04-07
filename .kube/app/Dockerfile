FROM php:8.1-fpm

ENV APP_DIR /app
ENV KUBE_DIR .kube/app

RUN apt-get update
RUN apt-get install -y nginx git unzip supervisor rsync nano wget curl s3cmd

RUN apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libxml2-dev \
    libonig-dev \
    libpng-dev

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install -j$(nproc) gd
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath
RUN docker-php-ext-install opcache

RUN apt-get install -y libmagickwand-dev --no-install-recommends

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

RUN pecl install imagick
RUN docker-php-ext-enable imagick

RUN printf "\n" | pecl install apcu
RUN docker-php-ext-enable apcu

COPY $KUBE_DIR/nginx.conf /etc/nginx/nginx.conf
COPY $KUBE_DIR/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN mkdir $APP_DIR
WORKDIR $APP_DIR
COPY . $APP_DIR

COPY $KUBE_DIR/wp-config.kube.php $APP_DIR/web/wp-config.php

ENTRYPOINT $APP_DIR/$KUBE_DIR/entrypoint.sh
