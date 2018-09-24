FROM node:alpine

RUN mkdir /code
WORKDIR /code

ENV PATH /code/node_modules/.bin:$PATH

COPY kudos-o-matic/package.json .

RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent

CMD ["npm", "start"]
