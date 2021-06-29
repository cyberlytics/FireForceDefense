FROM node:14-alpine

WORKDIR /app

ENV DB='ffd-prod'
ENV DB_URL='ffd.ux1aa.mongodb.net'
ARG DB_KEY
ENV DB_KEY=$DB_KEY
ARG SECRET_KEY
ENV SECRET_KEY=$SECRET_KEY

COPY . .

RUN npm install --silent

EXPOSE 3000

CMD [ "npm", "start" ]