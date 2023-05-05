FROM node:16-alpine

WORKDIR /mvc

COPY package.json .

RUN npm install && npm i -g nodemon

COPY . .

CMD ["nodemon", "server.js"]