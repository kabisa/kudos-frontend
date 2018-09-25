FROM node:alpine as builder
RUN mkdir /code
WORKDIR /code
ENV PATH /code/node_modules/.bin:$PATH
COPY kudos-o-matic/package.json /code/package.json
RUN npm install --silent
COPY kudos-o-matic .
RUN /code/node_modules/.bin/react-scripts build

# Staging image
FROM nginx:alpine
COPY --from=builder /code/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
RUN echo "Web server started!"
