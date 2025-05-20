FROM node:20-slim

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE  3333

CMD ["npm", "run", "start:dev"]



