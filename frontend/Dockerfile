FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Port, auf dem das Frontend erreichbar sein soll
EXPOSE 3000

CMD ["npm", "start"]
