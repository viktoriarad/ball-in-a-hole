import { IView, IGame, IBall, ICircle, IStar, IGameObjects } from "../interfaces/gameobjects.js";
import { ISize } from "../interfaces/gametypes.js";

export class View implements IView {
  private readonly game: IGame;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly body: HTMLBodyElement;
  private fieldSize: ISize;
  private readonly fullScreenMsg: HTMLElement;
  private readonly rotateMsg: HTMLElement;
  private readonly pauseMsg: HTMLElement;
  private readonly gameOverMsg: HTMLElement;
  private readonly nextLevelMsg: HTMLElement;
  private readonly gamePanel: HTMLElement;
  private readonly timeInfo: HTMLElement;
  private readonly scoreInfo: HTMLElement;
  private readonly levelInfo: HTMLElement;
  private readonly pauseButton: HTMLElement;
  private readonly startGameBtn: HTMLElement;

  constructor(_game: IGame, _fieldSize: ISize) {
    this.game = _game;
    this.fieldSize = _fieldSize;
    this.body = <HTMLBodyElement>document.body;

    this.canvas = <HTMLCanvasElement>this.createHTMLElement("canvas");
    this.canvas.width = this.fieldSize.width;
    this.canvas.height = this.fieldSize.height;
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    this.addHTMLElement(this.body, this.canvas);

    // Tworzymy popupy z komunikatami dla roznych przypadkow
    this.rotateMsg = this.createHTMLElement("div", "rotate-msg");
    this.addHTMLElement(this.body, this.rotateMsg);

    this.fullScreenMsg = this.createHTMLElement("div", "fullscreen-msg");
    this.fullScreenMsg.classList.add("invisible");
    this.addHTMLElement(this.body, this.fullScreenMsg);
    this.addEventListener(this.fullScreenMsg, "click", this.onTouchFullScreenMsg.bind(this));

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

    this.gamePanel = this.createHTMLElement("div", "game-panel");
    this.gamePanel.classList.add("invisible");
    this.timeInfo = this.createHTMLElement("div", "time-info");
    this.scoreInfo = this.createHTMLElement("div", "score-info");
    this.levelInfo = this.createHTMLElement("div", "level-info");
    this.pauseButton = this.createHTMLElement("div", "pause-button");
    this.addEventListener(this.pauseButton, "click", this.onClickPause.bind(this));

    this.addHTMLElement(this.gamePanel, this.scoreInfo);
    this.addHTMLElement(this.gamePanel, this.timeInfo);
    this.addHTMLElement(this.gamePanel, this.levelInfo);
    this.addHTMLElement(this.gamePanel, this.pauseButton);

    this.addHTMLElement(this.body, this.gamePanel);
  };

  /**
   * Funkcja tworzy canvas
   * @returns {void}
   */
  private updateCanvasSize(): void {
    this.canvas.width = this.fieldSize.width;
    this.canvas.height = this.fieldSize.height;
  };

  /**
   * Funkcja tworzy canvas
   * @returns {void}
   */
  private updateFieldSize(): void {
    this.fieldSize = this.game.getFieldSize();
  };

  public updateGamePanel(score: number, level: number, time: string): void {
    this.scoreInfo.innerText = "Score: " + score.toString();
    this.levelInfo.innerText = "Level: " + level.toString();
    this.timeInfo.innerText = time;
  };

  public updateTimeInfo(time: string): void {
    this.timeInfo.innerText = time;
  };

  /**
   * Funkcja wyswietla komunikat z przegranej
   * @returns {void}
   */
  public gameOver(): void {
    this.gameOverMsg.classList.remove('invisible');
  };

  /**
   * Funkcja wyswietla komunikat z wygranej
   * @returns {void}
   */
  public win(): void {
    this.nextLevelMsg.classList.remove('invisible');
  };

  /**
   * Funkcja tworzy HTMLElement z podanym tagiem i CSS klasa
   * @returns {HTMLElement}
   */
  private createHTMLElement(tag: string, cssClass: string = ""): HTMLElement {
    const element = document.createElement(tag);
    if (cssClass !== "") {
      element.classList.add(cssClass);
    }
    return element;
  };

  /**
   * Funkcja dodaje HTMLElement do innego
   * @returns {void}
   */
  private addHTMLElement(parent: HTMLElement, child: HTMLElement): void {
    parent.appendChild(child);
  };

  /**
   * Funkcja obsluguje dodanie eventListnera do elementu
   * @returns {void}
   */
  private addEventListener(target: HTMLElement, type: string, eventListener: EventListenerOrEventListenerObject): void {
    target.addEventListener(type, eventListener);
  };

  /**
   * Funkcja wyswietla komunikat z FullScreen trybem
   * @returns {void}
   */
  public showFullScreenMsg(): void {
    this.fullScreenMsg.classList.remove('invisible');
  };

  /**
   * Funkcja oblsuguje event nacisniecia na komunikat z FullScreen trybem
   * @returns {void}
   */
  private onTouchFullScreenMsg(): void {
    this.fullScreenMsg.classList.add('invisible');
    this.game.setFullScreen();
  };

  /**
   * Funkcja oblsuguje event nacisniecia komunikata z pausa
   * @returns {void}
   */
  private onTouchPauseMsg(): void {
    this.pauseMsg.classList.add('invisible');
    this.game.resume();
  };

  private onClickPause(): void {
    this.onPause();
    this.game.pause();
  }

  /**
   * Funkcja oblsuguje event nacisniecia komunikata z przegranej
   * @returns {void}
   */
  private onTouchGameOverMsg(): void {
    this.gameOverMsg.classList.add('invisible');
    this.game.restart();
  };

  /**
   * Funkcja oblsuguje event nacisniecia komunikata z nastepnym levelem
   * @returns {void}
   */
  private onTouchNextLevelMsg(): void {
    this.nextLevelMsg.classList.add('invisible');
    this.game.nextLevel();
  };

  /**
   * Funkcja obsluguje event nacisniecia przycisku Start
   * @returns {void}
   */
  private onPressStartGameBtn(): void {
    this.updateFieldSize();
    this.updateCanvasSize();
    this.gamePanel.classList.remove("invisible");
    this.game.onPressStartBtn();
  };

  /**
   * Funkcja ukrywa przycisk Start
   * @returns {void}
   */
  public onStart(): void {
    this.startGameBtn.classList.add('invisible');
  };

  /**
   * Funkcja odpowiada za widok gry w portrecie
   * @returns {void}
   */
  public onPortrait(): void {
    this.rotateMsg.classList.remove('invisible');
    this.gameOverMsg.classList.add('invisible');
    this.nextLevelMsg.classList.add('invisible');
    this.pauseMsg.classList.add('invisible');
  };

  /**
   * Funkcja odpowiada za widok gry w landscape
   * @returns {void}
   */
  public onLandscape(): void {
    this.rotateMsg.classList.add('invisible');
  };

  /**
   * Funkcja wyswietla komunikat z pauza
   * @returns {void}
   */
  public onPause(): void {
    this.pauseMsg.classList.remove('invisible');
  };

  /**
   * Funkcja wyswietla komunikat z wygranej
   * @returns {void}
   */
  public onWin(): void {
    this.nextLevelMsg.classList.remove('invisible');
  };

  /**
   * Funkcja wyswietla komunikat z przegranej
   * @returns {void}
   */
  public onGameOver(): void {
    this.gameOverMsg.classList.remove('invisible');
  };

  /**
   * Funkcja odpowiedzialna za rendering canvasu
   * @returns {void} Zwraca true jesli canvas zostal wyrendorowany lub false jesli nie
   */
  public render(objectsToRender: IGameObjects): void {
    const ball: IBall = objectsToRender.ball;
    const traps: Array<ICircle> = objectsToRender.traps;
    const finish: ICircle = objectsToRender.finish;
    const star: IStar = objectsToRender.star;

    this.ctx.clearRect(0, 0, this.fieldSize.width, this.fieldSize.height);
    this.ctx.fillStyle = "#00135d";
    this.ctx.fillRect(0, 0, this.fieldSize.width, this.fieldSize.height);

    traps.forEach((trap) => {
      this.ctx.beginPath();
      this.ctx.arc(trap.x, trap.y, trap.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = "#c90c0b";
      this.ctx.fill();
      this.ctx.closePath();
    });

    if (star.visible) {
      this.ctx.beginPath();
      this.ctx.moveTo(star.drawPoints[0].x, star.drawPoints[0].y);
      for (let i: number = 1; i < star.drawPoints.length; i++) {
        this.ctx.lineTo(star.drawPoints[i].x, star.drawPoints[i].y)
      }
      this.ctx.lineTo(star.drawPoints[0].x, star.drawPoints[0].y);
      this.ctx.fillStyle = "#e9e402";
      this.ctx.fill();
      this.ctx.closePath();
    }

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
