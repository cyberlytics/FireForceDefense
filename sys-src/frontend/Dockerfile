FROM node:14-alpine AS build-stage

WORKDIR /app

ENV API_URL='http://10.100.156.194:80'

COPY . .

RUN npm install --silent && npm run build

FROM nginx:alpine as production-stage

WORKDIR /usr/share/nginx/html

# remove default nginx static assets
RUN rm -rf ./*

COPY --from=build-stage /app/dist .

# nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]