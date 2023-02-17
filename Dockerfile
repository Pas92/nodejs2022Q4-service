FROM node:18.14-alpine
EXPOSE ${PORT}
WORKDIR /usr/app
COPY package*.json .
RUN npm install && npm cache clean --force
COPY . .
RUN npm run typeorm:create && npm run typeorm:generate && npm run typeorm:run
USER node
# CMD ["npm", "run", "typeorm:run"]
