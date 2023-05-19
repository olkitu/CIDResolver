### STAGE 1: Build ###
FROM node:16-alpine AS build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN ./node_modules/@angular/cli/bin/ng build --configuration production

FROM nginx:1.22.1-alpine
WORKDIR /var/www/html
COPY --from=build /usr/src/app/dist/cidresolver ./dist/cidresolver
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80