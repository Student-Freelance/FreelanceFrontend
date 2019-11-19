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
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

## Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
#FROM nginx:1.15
#COPY --from=build-stage /app/build/ /usr/share/nginx/html
## Copy the default nginx.conf provided by tiangolo/node-frontend
#COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
#
#react-build
#WORKDIR /app
#COPY . ./
#RUN yarn
#RUN yarn build

# Stage 2 - the production environment
#FROM nginx:alpine
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=react-build /app/build /usr/share/nginx/html
#Run Stage Start
FROM nginx
LABEL io.k8s.display-name="app name" \
      io.k8s.description="container description..." \
      io.openshift.expose-services="8080:http"
#Copy production build files from builder phase to nginx
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
