# ---- Base Node ----
FROM node:8.9.4 as base
WORKDIR /root/app
COPY .npmrc ./
COPY package.json yarn.lock ./

# ---- Dependencies ----
FROM base AS dependencies
RUN npm set progress=false && npm config set depth 0
RUN yarn --only=production
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN yarn

# ---- Test ----
FROM dependencies AS test
COPY . .
ENV CI=true
RUN npm run lint && npm run test

# ---- Build ----
FROM dependencies AS build
COPY . .
RUN yarn build

# ---- Release ----
FROM nginx
COPY --from=build /root/app/build /usr/share/nginx/html/
COPY ./server/nginx-configuration.conf /etc/nginx/conf.d/default.conf
EXPOSE 5002