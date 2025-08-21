FROM node:20-alpine

WORKDIR /app/apps/web

COPY apps/web/package.json ./
RUN npm install

COPY . /app

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]