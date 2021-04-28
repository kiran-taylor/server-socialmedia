FROM node:10-alpine

RUN mkdir -p /home/app/node_modules && chown -R node:node /home/app

WORKDIR /home/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 5000

CMD [ "node", "/home/app/index.js" ]
