FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci
RUN npm install nodemon

ENV DEBUG=playground:*

USER node
CMD npm start
