const { OAuth2Client } = require('google-auth-library');

const clientId = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientId);

async function authenticate(req, res, next){
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).send('Authorization Header missing');
    }

    try{
        const token = authHeader.split(' ')[1];
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId,
        });
        const userInformation = ticket.getPayload();
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
}

module.exports = authenticate;