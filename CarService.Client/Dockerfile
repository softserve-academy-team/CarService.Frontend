FROM node:8.9.4-alpine
WORKDIR /sln
COPY . .
RUN npm install --silent 
EXPOSE 4200
RUN npm run-script build 
ENTRYPOINT npm start


