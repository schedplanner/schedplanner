FROM node:21 AS base

WORKDIR /app

COPY package*.json ./
COPY schedplanner.inlang/ ./schedplanner.inlang

RUN npm install

COPY . ./

RUN npm run build

FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

COPY --from=base /app/schedplanner.inlang/ ./schedplanner.inlang

RUN npm install --omit=dev

COPY --from=base /app/dist ./dist

USER node
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["entrypoint.sh"]