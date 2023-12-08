FROM node:20.9

COPY . /app/

WORKDIR /app/

RUN npm install

RUN npm run build

CMD ["npm", "run", "start:dev"]
