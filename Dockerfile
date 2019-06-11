FROM node:10-alpine

ENV HOME=/home/node
ENV APP_DIR=$HOME/api

COPY ./ $APP_DIR/

WORKDIR $APP_DIR

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm i \
    && apk del build-dependencies

EXPOSE 9000
CMD ["npm", "run", "prod"]