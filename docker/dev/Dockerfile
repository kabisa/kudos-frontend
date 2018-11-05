FROM node:alpine

RUN mkdir /code
WORKDIR /code

COPY package.json .
COPY yarn.lock .
RUN yarn

CMD ["./bin/maji", "start"]
