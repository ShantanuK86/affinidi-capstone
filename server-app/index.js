var express = require('express');
require('dotenv').config()
var cors = require('cors');
const { affinidiProvider } = require('@affinidi/passport-affinidi')

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

const initializeServer = async () => {

    app.get('/', function (req, res, next) {
        res.json({ success: 'Express' });
    });
    app.use(cors({ credentials: true, origin: true }));
    app.set('trust proxy', 1);
    await affinidiProvider(app, {
        id: "affinidi",
        issuer: process.env.AFFINIDI_ISSUER,
        client_id: process.env.AFFINIDI_CLIENT_ID,
        client_secret: process.env.AFFINIDI_CLIENT_SECRET,
        redirect_uris: ['https://affinidi-capstone-woad.vercel.app/auth/callback'], 
        handleCredential: (credential) => {
            console.log('Received credential:', credential);
        },
    });

    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
    

}

initializeServer();