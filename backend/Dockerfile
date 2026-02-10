FROM node:22.16.0
WORKDIR backend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "npx","nodemon","src/index.ts" ]