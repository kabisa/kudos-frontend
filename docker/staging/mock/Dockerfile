FROM node:alpine
RUN mkdir /code
WORKDIR /code
COPY kudos-o-matic/mock .
RUN npm install --production
EXPOSE 3001
CMD [ "npm", "start" ]
