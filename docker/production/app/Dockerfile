FROM node:19-alpine

COPY --chown=node:node ./app/package*.json .

RUN ["npm", "install"]

COPY app/ /app/

WORKDIR /app/
RUN ["npm", "run", "production"]