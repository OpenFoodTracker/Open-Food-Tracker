# Basisbild. Verwende die offizielle Node.js-Umgebung als Eltern-Image.
FROM node:18

# Arbeitsverzeichnis im Container festlegen
WORKDIR /usr/src/app

# Abhängigkeiten installieren
# Eine Wildcard wird verwendet, um sowohl package.json als auch package-lock.json zu kopieren
COPY package*.json ./
RUN npm install

# App-Quellcode in den Container kopieren
COPY . .

# Port, auf dem die App laufen soll
EXPOSE 5000

# App starten
CMD ["npm", "start"]
