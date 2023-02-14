FROM node:18.14-alpine
EXPOSE ${PORT}
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
USER node
# CMD ["npm", "run", "start:dev"]
