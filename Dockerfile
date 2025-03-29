FROM node:22-alpine

ENV HOME=/home/node
ENV APP_DIR=$HOME/app

COPY ./ $APP_DIR/

WORKDIR $APP_DIR

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++ \
    yarn && \
    yarn install && \
    yarn cache clean && \
    apk del build-dependencies

EXPOSE 9000

CMD ["npm", "run", "prod"]