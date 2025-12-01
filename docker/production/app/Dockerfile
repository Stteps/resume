FROM node:19-alpine
WORKDIR /cache/
COPY --chown=node:node ./app/package*.json .

RUN apk update \
    && apk add --no-cache --virtual .build-deps python3 make g++ git \
    && npm install \
    && apk del .build-deps

COPY . .

COPY --chown=node:node docker/development/app/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

WORKDIR /app/
ENV PATH /app/node_modules/.bin:$PATH

ENTRYPOINT ["entrypoint.sh"]
CMD ["npm", "run", "production"]