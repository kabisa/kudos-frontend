FROM node:9.6.1 as builder

RUN mkdir /code
WORKDIR /code

ENV PATH /code/node_modules/.bin:$PATH
COPY package.json /code/package.json
RUN npm install

COPY . /code

RUN npm run build

# production environment
FROM nginx:alpine
COPY --from=builder /code/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]

