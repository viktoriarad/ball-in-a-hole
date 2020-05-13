import { Game } from "../Game.js";
import { record } from "../interfaces/gametypes.js";

const url: string = 'wss://game.viktoriarad.com';

export class Server {
  private socket: WebSocket;
  private game: Game;

  constructor(game: Game) {
    this.game = game;
    this.socket = new WebSocket(url);
    this.initListeners();
 };

  /**
   * Funkcja ustawia nasluchiwanie na przychodzace dane od servera.
   * @returns {record}
   */
  private initListeners(): void {
    this.socket.addEventListener('message', this.onServerMessage.bind(this));
  };

  /**
   * Funkcja obsluguje zdarzenie przyjecia danych od servera.
   * @returns {record}
   */
  private onServerMessage(event: WebSocketEventMap["message"]): void {
    this.game.onServerMessage(this.parseServerResponse(event.data));
  };

  /**
   * Funkcja parsuje odpowiedz servera.
   * @returns {record}
   */
  private parseServerResponse(response: string): record {
    const parsedServerResponse = <record> JSON.parse(response);
    console.log(parsedServerResponse);

    return parsedServerResponse;
  };

}
