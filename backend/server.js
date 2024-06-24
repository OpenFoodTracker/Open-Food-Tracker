/**
 * Projektname: Open-Food-Tracker
 * 
 * Mitwirkende:
 * - Charlotte Brückner
 * - Martin Derek
 * - Lukas Tränkle
 * - Leandros Tsolakidis
 * 
 * Lizenz: MIT License
 * 
 * Weitere Informationen finden Sie in der LICENSE-Datei im Hauptverzeichnis dieses Projekts.
 */



require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const authenticate = require('./authenticate');

// Router imports
const userRoutes = require('./routes/userRouter');
const userRecipeRoutes = require('./routes/userRecipeRouter');
const userMealRoutes = require('./routes/userMealRouter');
const offApiRouter = require('./routes/offApiRouter');

mongoose.set('useFindAndModify', false);

const app = express();

// CORS-Optionen konfigurieren
const corsOptions = {
    origin: ['http://openfoodtracker.com', 'http://www.openfoodtracker.com'],
    optionsSuccessStatus: 200
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());

app.use(authenticate);

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/recipe', userRecipeRoutes);
app.use('/api/meal/user', userMealRoutes);
app.use('/api/offApi', offApiRouter);

// create a server
const server = http.createServer(app);

// WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        ws.send('Message received');
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

// connect to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        server.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });

module.exports = app;
