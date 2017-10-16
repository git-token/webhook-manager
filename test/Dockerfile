# Use this Dockerfile for CI tests only!

FROM node:6.11.0

RUN npm i -g mocha

WORKDIR /gittoken-webhook-manager

ADD ../ .

RUN npm install

CMD [mocha]
