FROM node:22.2.0

RUN apt-get update
RUN apt-get install -y ruby-full nginx git unzip supervisor rsync nano wget curl

RUN mkdir /colab-coop
WORKDIR /colab-coop
COPY . /colab-coop

RUN gem install compass --pre

RUN npm install && npm run build

CMD bash
