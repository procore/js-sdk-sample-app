FROM node:16.18.0-alpine

RUN apk add --no-cache bash git openssh-client

COPY . /js-sdk-sample-app/

WORKDIR /js-sdk-sample-app

RUN yarn install
RUN yarn build

COPY . /js-sdk-sample-app
