FROM node:14

WORKDIR /app

COPY package.json ./

COPY prisma ./prisma/

COPY .env ./

COPY . .

RUN npm install 

RUN npx prisma generate

EXPOSE 5001

CMD [ "node", "index.js" ]