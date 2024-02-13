FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY ./src ./src
COPY . .

CMD ["npm", "start"]