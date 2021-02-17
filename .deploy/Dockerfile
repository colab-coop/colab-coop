FROM node:8 AS build

WORKDIR /app
COPY . .

RUN apt-get install ruby-dev -y
RUN gem install compass --pre

RUN npm install && npm run build

FROM nginx:alpine

COPY --from=build /app/build /var/www/html

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
