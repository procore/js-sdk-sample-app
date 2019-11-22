FROM node:12.13.0-alpine as builder
RUN apk add yarn
RUN apk add git
WORKDIR /app
COPY . ./
RUN yarn --pure-lockfile

CMD yarn start

