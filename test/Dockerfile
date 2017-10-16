# Use this Dockerfile for CI tests only!

FROM node:6.11.0

WORKDIR /gittoken-webhook-manager

ADD . .

RUN npm install

CMD mocha
