import * as express from 'express';
import * as https from 'https';
import * as WebSocket from 'ws';
import { record } from './types';
import * as fs from 'fs';
import * as faker from 'faker';
import * as path from 'path';

const app = express();


const privateKey = fs.readFileSync('../../ssl/key.pem', 'utf8');
const certificate = fs.readFileSync('../../ssl/cert.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

//initialize a simple http index
const index = https.createServer(credentials, app);

//initialize the WebSocket index instance
const wss = new WebSocket.Server({ server: index });

wss.on('connection', (ws: WebSocket) => {
    ws.send('Successfully connected');

    ws.on('message', (message: string) => {
        ws.send(`Hello, you sent -> ${message}`);
    });

    setInterval(() => {
        const randomUserRecord: record = {username: faker.internet.userName(), score: faker.random.number()};
        ws.send(JSON.stringify(randomUserRecord));
    },5000);

});

index.listen(process.env.PORT || 8999, () => {
    // @ts-ignore
    console.log(`Server started on port ${index.address().port} :)`);
});

app.use(express.static(path.join(__dirname, '/../client/')));