# Basisbild. Verwende die offizielle Node.js-Umgebung als Eltern-Image.
FROM node:14

# Arbeitsverzeichnis im Container festlegen.
WORKDIR /app

# Kopiere die 'package.json' in das Arbeitsverzeichnis.
COPY package*.json ./

# Installiere alle Node-Abhängigkeiten.
RUN npm install

# Kopiere den restlichen Anwendungscode in das Arbeitsverzeichnis im Container.
COPY . .

# Dein Port, den Node.js verwendet.
EXPOSE 5000

# Führe die Anwendung aus.
CMD ["node", "server.js"]
