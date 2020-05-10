import { IGame } from "../interfaces/gameobjects.js";

const url: string = 'ws://ws.viktoriarad.com';

export class Server {
  private socket: WebSocket;
  private game: IGame;

  constructor(game: IGame) {
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

}
