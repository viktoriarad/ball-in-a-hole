const url = 'wss://game.viktoriarad.com';
export class Server {
    constructor(game) {
        this.game = game;
        this.socket = new WebSocket(url);
        this.initListeners();
    }
    ;
    /**
     * Funkcja ustawia nasluchiwanie na przychodzace dane od servera.
     * @returns {record}
     */
    initListeners() {
        this.socket.addEventListener('message', this.onServerMessage.bind(this));
    }
    ;
    /**
     * Funkcja obsluguje zdarzenie przyjecia danych od servera.
     * @returns {record}
     */
    onServerMessage(event) {
        this.game.onServerMessage(this.parseServerResponse(event.data));
    }
    ;
    /**
     * Funkcja parsuje odpowiedz servera.
     * @returns {record}
     */
    parseServerResponse(response) {
        const parsedServerResponse = JSON.parse(response);
        console.log(parsedServerResponse);
        return parsedServerResponse;
    }
    ;
}
//# sourceMappingURL=Server.js.map