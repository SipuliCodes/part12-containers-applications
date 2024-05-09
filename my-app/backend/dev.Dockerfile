FROM node:20.3.0

WORKDIR /usr/src/app

COPY . .
RUN npm ci

CMD ["npm", "run", "dev"]