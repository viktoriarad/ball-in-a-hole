import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { record } from './types';

const faker = require('faker');
const app = express();

//initialize a simple http index
const index = http.createServer(app);

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
