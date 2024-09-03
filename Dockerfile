FROM node:18.18.0-alpine

WORKDIR /app

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .

EXPOSE 3000
USER node

CMD [ "npm", "run", "start:dev" ]


