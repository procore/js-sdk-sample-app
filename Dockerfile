FROM node:16.18.0-alpine AS builder

RUN apk add --no-cache bash git openssh-client

COPY . /js-sdk-sample-app/

WORKDIR /js-sdk-sample-app

RUN npm install
RUN npm run build

COPY . /js-sdk-sample-app
