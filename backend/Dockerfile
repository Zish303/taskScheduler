FROM node:20.15.1

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]