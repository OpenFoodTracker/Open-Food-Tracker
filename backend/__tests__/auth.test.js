const fetch = require('node-fetch');
const express = require('express');
const authenticate = require('./../authenticate');


let server;

beforeAll((done) => {
    const app = express();
    app.use(authenticate);
    
    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });

    server = app.listen(5000, () => {
        console.log('Test server running on port 5000');
        done();
    });
});

afterAll(async () => {
    server.close();
});

describe('Authentication Tests', function() {
    const baseUrl = 'http://localhost:5000';

    // Scenario 1: Missing Authorization header
    it('should return 401 for missing Authorization header', async function() {
        const response = await fetch(`${baseUrl}/`);
        const data = await response.text();

        expect(response.status).toBe(401);
        expect(data).toBe('Authorization Header missing');
    });

    // Scenario 2: Malformed Authorization header
    it('should return 401 for malformed Authorization header', async function() {
        const response = await fetch(`${baseUrl}/`, {
            headers: {
                'Authorization': 'Bearer ' // Missing token
            }
        });
        const data = await response.text();

        expect(response.status).toBe(401);
        expect(data).toBe('Invalid token');
    });

    // Scenario 3: Invalid token
    it('should return 401 for invalid token', async function() {
        const response = await fetch(`${baseUrl}/`, {
            headers: {
                'Authorization': 'Bearer invalid_token'
            }
        });
        const data = await response.text();

        expect(response.status).toBe(401);
        expect(data).toBe('Invalid token');
    });
});
