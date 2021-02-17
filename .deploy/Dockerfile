FROM node:8 AS build

WORKDIR /app
COPY . .

RUN apt-get install ruby-dev -y
RUN gem install compass --pre

RUN npm install && npm run build

FROM ubuntu:focal

RUN apt-get update
RUN apt-get install nginx -y

COPY --from=build /app/build /var/www/html

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
