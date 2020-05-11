const url = 'wss://game.viktoriarad.com';
export class Server {
    constructor(game) {
        this.changeProtocol();
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
    /**
     * Funkcja zmienia protokol na szyfrowany.
     * @returns {void}
     */
    changeProtocol() {
        if (window.location.protocol !== 'https:') {
            window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
        }
    }
    ;
}
//# sourceMappingURL=Server.js.map