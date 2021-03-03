FROM node:8 AS build

WORKDIR /app
COPY . .

RUN apt-get update
RUN apt-get install ruby-full -y
RUN gem install compass --pre

RUN npm install && npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
