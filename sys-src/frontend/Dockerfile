FROM node:14-alpine AS build-stage

WORKDIR /app

ENV API_URL='http://0.0.0.0:3000'

COPY . .

RUN npm install --silent && npm run build

FROM nginx:alpine as production-stage

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

WORKDIR /usr/share/nginx/html

# remove default nginx static assets
RUN rm -rf ./*

COPY --from=build-stage /app/dist .

# nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]