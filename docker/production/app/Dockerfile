FROM node:19-alpine

WORKDIR /app/

COPY --chown=node:node ./app/package*.json .

RUN apk update \
    && apk add --no-cache --virtual .build-deps python3 make g++ git \
    && npm install \
    && apk del .build-deps

COPY . .

CMD ["npm", "run", "production"]