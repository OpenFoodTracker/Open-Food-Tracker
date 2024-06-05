FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Port, auf dem das Frontend erreichbar sein soll
EXPOSE 3000

CMD ["npm", "start"]
