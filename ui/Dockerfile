FROM node:17 as builder
WORKDIR /app/src/
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build

# FROM nginx
FROM arm64v8/nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY ./proxy.conf /etc/nginx/conf.d/proxy.conf
COPY --from=builder /app/src/dist /usr/share/nginx/html
