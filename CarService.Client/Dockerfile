FROM node:8.9.4-alpine AS builder
COPY . /CarService.Client
WORKDIR /CarService.Client
RUN npm install --silent
RUN $(npm bin)/ng build

FROM nginx
COPY --from=builder /CarService.Client/dist/* /usr/share/nginx/html/






