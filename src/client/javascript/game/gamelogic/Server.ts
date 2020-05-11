import { IGame } from "../interfaces/gameobjects.js";

const url: string = 'wss://game.viktoriarad.com';

export class Server {
  private socket: WebSocket;
  private game: IGame;

  constructor(game: IGame) {
    this.changeProtocol();

    this.game = game;
    this.socket = new WebSocket(url);
    this.initListeners();
 }

  private initListeners(): void {
    this.socket.addEventListener('message', this.onServerMessage.bind(this));
  }

  private onServerMessage(event: WebSocketEventMap["message"]): void {
    this.game.onServerMessage(event.data);
  }

  /**
   * Funkcja zmienia protokol na szyfrowany.
   * @returns {void}
   */
  private changeProtocol(): void {
    if (window.location.protocol !== 'https:') {
      window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    }
  };

}
