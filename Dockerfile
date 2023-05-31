FROM combos/ruby_node:3_12

RUN mkdir /colab-coop
WORKDIR /colab-coop

RUN gem update --system

RUN gem install compass
RUN npm install

CMD bash
