const { OAuth2Client } = require('google-auth-library');

const clientId = '560988237934-8vl914madk3tpf281m0fklrrc6nof6fu.apps.googleusercontent.com';
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
        //OTHER CHECKS
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send('Invalid token');
    }
}

module.exports = authenticate;