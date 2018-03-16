FROM node:8.9.4-alpine AS builder
COPY . /CarService.Client
WORKDIR /CarService.Client
RUN npm install --silent
RUN npm install --silent @angular/material 
RUN npm install --silent @angular/cdk 
RUN npm install --silent @angular/animations 
RUN $(npm bin)/ng build

FROM nginx:1.13.8-alpine
COPY --from=builder /CarService.Client/dist/* /usr/share/nginx/html/






