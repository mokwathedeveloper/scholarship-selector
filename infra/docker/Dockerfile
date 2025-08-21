FROM node:20-alpine

WORKDIR /app

COPY apps/api/package.json ./apps/api/
COPY packages/db/package.json ./packages/db/
COPY packages/ai/package.json ./packages/ai/
COPY packages/core/package.json ./packages/core/
COPY packages/config/package.json ./packages/config/

RUN npm install --prefix apps/api
RUN npm install --prefix packages/db
RUN npm install --prefix packages/ai
RUN npm install --prefix packages/core
RUN npm install --prefix packages/config

COPY . .

RUN npm run build --prefix apps/api

EXPOSE 3001

CMD ["npm", "start", "--prefix", "apps/api"]