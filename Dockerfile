# FROM gmathieu/node-browsers:3.0.0 AS build

# COPY package.json /usr/angular-workdir/
# WORKDIR /usr/angular-workdir
# RUN npm install

# COPY ./ /usr/angular-workdir
# RUN npm run build

# FROM nginx:1.15.8-alpine

# ## Remove default Nginx website
# RUN rm -rf /usr/share/nginx/html/*

# COPY ./dev/nginx.conf /etc/nginx/nginx.conf

# COPY --from=build  /usr/angular-workdir/dist/angular-docker /usr/share/nginx/html

# RUN echo "mainFileName=\"\$(ls /usr/share/nginx/html/main*.js)\" && \
#           envsubst '\$BACKEND_API_URL \$DEFAULT_LANGUAGE ' < \${mainFileName} > main.tmp && \
#           mv main.tmp  \${mainFileName} && nginx -g 'daemon off;'" > run.sh

# ENTRYPOINT ["sh", "run.sh"]

# # base image
# FROM nginx:1.16.0-alpine

# # copy artifact build from the 'build environment'
# COPY --from=build /app/dist /usr/share/nginx/html

# # expose port 80
# EXPOSE 80

# # run nginx
# CMD ["nginx", "-g", "daemon off;"]

# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install --force
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
# FROM nginx:1.15
# COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
# # Copy the default nginx.conf provided by tiangolo/node-frontend
# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
