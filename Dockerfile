# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
# base image
FROM node:12.2.0-alpine as build-stage

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g
COPY ./ /app/

EXPOSE 8080

ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration
