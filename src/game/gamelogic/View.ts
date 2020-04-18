import { IView, IGame, IBall, ICircle, IGameObjects } from "../interfaces/gameobjects.js";
import { ISize } from "../interfaces/gametypes.js";

export class View implements IView {
  private readonly game: IGame;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly body: HTMLBodyElement;
  private readonly fieldSize: ISize;
  private readonly rotateMsg: HTMLElement;
  private readonly pauseMsg: HTMLElement;
  private readonly gameOverMsg: HTMLElement;
  private readonly nextLevelMsg: HTMLElement;
  private readonly startGameBtn: HTMLElement;

  constructor(_game: IGame, _fieldSize: ISize) {
    this.game = _game;
    this.fieldSize = _fieldSize;
    this.body = <HTMLBodyElement>document.body;

    this.canvas = <HTMLCanvasElement>this.createHTMLElement("canvas");
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    this.addHTMLElement(this.body, this.canvas);

    this.rotateMsg = this.createHTMLElement("div", "rotate-msg");
    this.addHTMLElement(this.body, this.rotateMsg);

    this.pauseMsg = this.createHTMLElement("div", "pause-msg");
    this.pauseMsg.classList.add("invisible");
    this.addHTMLElement(this.body, this.pauseMsg);
    this.addEventListener(this.pauseMsg, "click", this.onTouchPauseMsg.bind(this));

    this.gameOverMsg = this.createHTMLElement("div", "gameover-msg");
    this.gameOverMsg.classList.add("invisible");
    this.addHTMLElement(this.body, this.gameOverMsg);
    this.addEventListener(this.gameOverMsg, "click", this.onTouchGameOverMsg.bind(this));

    this.nextLevelMsg = this.createHTMLElement("div", "nextlevel-msg");
    this.nextLevelMsg.classList.add("invisible");
    this.addHTMLElement(this.body, this.nextLevelMsg);
    this.addEventListener(this.nextLevelMsg, "click", this.onTouchNextLevelMsg.bind(this));

    this.startGameBtn = this.createHTMLElement("button", "start-game");
    this.addHTMLElement(this.body, this.startGameBtn);
    this.addEventListener(this.startGameBtn, "click", this.onPressStartGameBtn.bind(this));

  }

  gameOver(): void {
    this.gameOverMsg.classList.remove('invisible');
  };

  win(): void {
    this.nextLevelMsg.classList.remove('invisible');
  };

  createHTMLElement(tag: string, cssClass: string = ""): HTMLElement {
    const element = document.createElement(tag);
    if (cssClass !== "") {
      element.classList.add(cssClass);
    }
    return element;
  };

  addHTMLElement(parent: HTMLElement, child: HTMLElement) {
    parent.appendChild(child);
  };

  addEventListener(target: HTMLElement, type: string, eventListener: EventListenerOrEventListenerObject) {
    target.addEventListener(type, eventListener);
  };

  onTouchPauseMsg(): void {
    this.pauseMsg.classList.add('invisible');
  };

  onTouchGameOverMsg(): void {
    this.gameOverMsg.classList.add('invisible');
  };

  onTouchNextLevelMsg(): void {
    this.nextLevelMsg.classList.add('invisible');
  };

  onPressStartGameBtn(): void {
    this.game.onPressStartBtn();
  };

  onStart(): void {
    this.startGameBtn.classList.add('invisible');
  };

  onPortrait(): void {
    this.rotateMsg.classList.remove('invisible');
    this.gameOverMsg.classList.add('invisible');
    this.nextLevelMsg.classList.add('invisible');
    this.pauseMsg.classList.add('invisible');
  }

  onLandscape(): void {
    this.rotateMsg.classList.add('invisible');
  }

  onPause(): void {
    this.pauseMsg.classList.remove('invisible');
  }

  onWin(): void {
    this.nextLevelMsg.classList.remove('invisible');
  }

  onGameOver(): void {
    this.gameOverMsg.classList.remove('invisible');
  }

  /**
   * Funkcja odpowiedzialna za rendering canvasu
   * @returns {void} Zwraca true jesli canvas zostal wyrendorowany lub false jesli nie
   */
  render(objectsToRender: IGameObjects): void {
    const ball: IBall = objectsToRender.ball;
    const traps: Array<ICircle> = objectsToRender.traps;
    const finish: ICircle = objectsToRender.finish;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#00135d";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    traps.forEach((trap) => {
      this.ctx.beginPath();
      this.ctx.arc(trap.x, trap.y, trap.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = "#c90c0b";
      this.ctx.fill();
      this.ctx.closePath();
    });

    this.ctx.beginPath();
    this.ctx.arc(
      finish.x,
      finish.y,
      finish.radius,
      0,
      Math.PI * 2
    );
    this.ctx.fillStyle = "#2bc932";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = "#c9c9c9";
    this.ctx.fill();
    this.ctx.closePath();
  };

}
