"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const faker = require('faker');
const app = express();
//initialize a simple http index
const index = http.createServer(app);
//initialize the WebSocket index instance
const wss = new WebSocket.Server({ server: index });
wss.on('connection', (ws) => {
    ws.send('Successfully connected');
    ws.on('message', (message) => {
        ws.send(`Hello, you sent -> ${message}`);
    });
    setInterval(() => {
        const randomUserRecord = { username: faker.internet.userName(), score: faker.random.number() };
        ws.send(JSON.stringify(randomUserRecord));
    }, 5000);
});
index.listen(process.env.PORT || 8999, () => {
    // @ts-ignore
    console.log(`Server started on port ${index.address().port} :)`);
});
//# sourceMappingURL=index.js.map