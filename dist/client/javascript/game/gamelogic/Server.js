const url = 'ws://ws.viktoriarad.com';
export class Server {
    constructor(game) {
        this.game = game;
        this.socket = new WebSocket(url);
        this.initListeners();
    }
    initListeners() {
        this.socket.addEventListener('message', this.onServerMessage.bind(this));
    }
    onServerMessage(event) {
        this.game.onServerMessage(event.data);
    }
}
//# sourceMappingURL=Server.js.map