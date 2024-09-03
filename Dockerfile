FROM node:21 AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=base /app/dist ./

USER node
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD node ./server/entry.mjs