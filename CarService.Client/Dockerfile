FROM node:8.9.4-alpine
WORKDIR /sln
COPY . .
RUN npm install --silent
RUN npm build
CMD npm start
