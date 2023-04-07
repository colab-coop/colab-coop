FROM starefossen/ruby-node:2-8-alpine

RUN mkdir /colab-coop
WORKDIR /colab-coop

RUN gem update --system

RUN apk add build-base
RUN apk add bash

RUN gem install compass
RUN npm install

CMD bash
