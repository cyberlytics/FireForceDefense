FROM node:14-alpine

WORKDIR /app

ENV DB='ffd-prod'
ENV DB_URL='ffd.ux1aa.mongodb.net'

COPY . .

RUN npm install --silent

EXPOSE 3000

CMD [ "npm", "start" ]