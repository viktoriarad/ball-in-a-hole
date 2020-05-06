import { IBall, IFinish, IStar, IView, IDevice, ITraps, IState, IGame, IGameObjects, IClock } from "./interfaces/gameobjects.js";
import { ISize, IOrientation, IPosition } from "./interfaces/gametypes.js";
import { Device, View, State } from './gamelogic/index.js';
import { Ball, Finish, Traps, Star, Clock } from './gameobjects/index.js';

export class Game implements IGame {

  private readonly device: IDevice;
  private fieldSize: ISize;
  private readonly view: IView;
  private readonly ball: IBall;
  private readonly finish: IFinish;
  private readonly star: IStar;
  private readonly traps: ITraps;
  private state: IState;
  private level: number;
  private bonus: boolean = true;
  private score: number = 0;
  private clock: IClock;

  constructor(ballRadius: number) {
    this.device = new Device(this);
    this.fieldSize = this.defineFieldSize(this.device.getScreenSize());

    this.view = new View(this, this.fieldSize);

    this.ball = new Ball(ballRadius);
    this.star = new Star(ballRadius);
    this.finish = new Finish(ballRadius);
    this.traps = new Traps(ballRadius);
    this.clock = new Clock();

    this.state = new State();
    this.level = 0;

    this.device.setupDeviceHandlers();
    this.updateOrientationViewOnInit();
  };

  /**
   * Funkcja obsluguje zdarzenie nacisniecia przycisku Start.
   * @returns {void}
   */
  onPressStartBtn(): void {
    if (this.device.isiOS) {
      this.device.requestSensorsPermission();
    } else {
      this.start();
    }
  };

  /**
   * Funkcja rozpoczyna gre.
   * @returns {void}
   */
  start(): void {
    this.view.onStart();
    this.nextLevel();
    this.render();
    this.device.setDeviceOrientationEventHandler();
  };

  /**
   * Funkcja rozpoczyna gre z nastepnym levelem.
   * @returns {void}
   */
  nextLevel(): void {
    this.level += 1;
    this.bonus = true;

    this.ball.generateNewPosition(this.fieldSize);
    this.finish.generateNewPosition(this.fieldSize);
    this.star.generate(this.fieldSize);
    this.traps.generateTraps(this.level, this.finish, this.ball, this.star, this.fieldSize);

    this.state.start();
    this.clock.start();

    this.view.updateGamePanel(this.score, this.level, this.clock.getValueString());
    this.render();
  };

  /**
   * Funkcja kontynuje gre po pausie.
   * @returns {void}
   */
  public resume(): void {
    this.state.start();
    this.clock.resume();
  };

  /**
   * Funkcja zatryzumje gre na pausie.
   * @returns {void}
   */
  public pause(): void {
    this.state.pause();
    this.clock.pause();
  };

  /**
   * Funkcja restartuje gre.
   * @returns {void}
   */
  public restart(): void {
    this.level = 0;
    this.score = 0;
    this.nextLevel();
  };

  /**
   * Funkcja zwraca rozmiar planszy gry. Nie zaleznie od urzadzenia zawsze przypisyjemy wieksza wartosc do szerokosci
   * i mniejsza do wysykosci.
   * @returns {ISize}
   */
  private defineFieldSize(screenSize: ISize): ISize {
    return {
      width: screenSize.width > screenSize.height ? screenSize.width : screenSize.height,
      height: screenSize.width > screenSize.height ? screenSize.height : screenSize.width
    };
  };

  public onResize(screenSize: ISize): void {
    this.fieldSize = this.defineFieldSize(screenSize);
  };

  public requestFullScreen(): void {
    this.view.showFullScreenMsg();
  };

  public setFullScreen(): void {
    this.device.setFullScreen();
  };

  public getFieldSize(): ISize {
    return this.fieldSize;
  };

  /**
   * Funkcja konczy gre z przegranym wynikiem.
   * @returns {void}
   */
  public gameOver(): void {
    this.state.over();
  };

  /**
   * Funkcja konczy gre z wygranym wynikiem.
   * @returns {void}
   */
  public win(): void {
    this.state.win();
    this.addScore();
  };

  private addScore(): void {
    let currentScore: number = this.level * 10;
    const timeMax: number = Math.round(5 * this.level * 0.4);
    if (this.clock.getValueInSecs() <= timeMax) {
      currentScore *= 1.5;
    }

    this.score += currentScore;
  };

  /**
   * Funkcja zwraca obiekty gry.
   * @returns {IGameObjects}
   */
  public getGameObjects(): IGameObjects {
    return {
      ball: this.ball,
      traps: this.traps.getAll(),
      star: this.star,
      finish: this.finish
    }
  };

  /**
   * Funkcja obsluguje zdarzenia zmiany polozenia urzadzenia.
   * @returns {void}
   */
  public accelerate(coords: IPosition): void {
    if (!this.state.isActive()) return;

    this.moveBallBy(coords);
    this.render();

    if (this.state.isGameOver()) {
      this.view.gameOver();
    } else if (this.state.isWin()) {
      this.view.win();
    }
  };

  /**
   * Funkcja obsluguje zachowanie w przypadku zmiany orientacjii urzadzenia
   * @returns {void}
   */
  public onOrientationChange(): void {
    this.pause();

    if (this.device.isPortrait) {
      this.view.onPortrait();
    } else {
      this.view.onLandscape();
      this.updateLandscapeView();
    }

    this.render();
  };

  /**
   * Funkcja odswieza widok gry podczas inicjalizacji w zaleznosci od orientacji
   * @returns {void}
   */
  private updateOrientationViewOnInit(): void {
    if (this.device.isPortrait) {
      this.view.onPortrait();
    } else {
      this.view.onLandscape();
    }
  };

  /**
   * Funkcja odswieza widok gry w landscapie
   * @returns {void}
   */
  private updateLandscapeView(): void {
    if (this.state.isPaused()) {
      this.view.onPause();
    } else if (this.state.isWin()){
      this.view.onWin();
    } else if (this.state.isGameOver()){
      this.view.onGameOver();
    }
  };

  /**
   * Funkcja przesuwa pilke na odpowiednia ilosc pixeli.
   * @returns {void}
   */
  private moveBallBy(coords: IPosition): void {
    const orientation: IOrientation = this.device.getOrientation();
    const multiplier: number = orientation.reversed ? 1 : -1;

    this.ball.moveBy({
      x: coords.x * multiplier * this.level * 0.1,
      y: coords.y * (multiplier * -1) * this.level * 0.1
    });

    if (this.gotInTrap()) {
      this.gameOver();
    } else if (this.gotFinish()) {
      this.win();
    } else if (this.gotStar() && this.bonus) {
      this.bonus = false;
      this.star.hide();
      this.getBonus();
    }
  };

  private getBonus(): void {
    this.traps.decreaseTraps(2);
  }

  /**
   * Funkcja sprawdza czy pilka nie trafila do czerwonej pulapki
   * @returns {boolean} True or false
   */
  private gotInTrap(): boolean {
    return this.traps.checkIfBallGotInside(this.ball);
  };

  /**
   * Funkcja sprawdza czy pilka nie trafila do zielonej dziury (finiszu)
   * @returns {boolean} True or false
   */
  private gotFinish(): boolean {
    return this.finish.checkIfBallGotInside(this.ball);
  };

  /**
   * Funkcja sprawdza czy pilka nie trafila do zielonej dziury (finiszu)
   * @returns {boolean} True or false
   */
  private gotStar(): boolean {
    return this.star.checkIfBallGotInside(this.ball);
  };

  /**
   * Funkcja odpowiedzialna za rendering widoku gry
   * @returns {void}
   */
  private render(): void {
    if (!this.state.isActive()) return;

    const objectsToRender: IGameObjects = this.getGameObjects();
    this.view.updateTimeInfo(this.clock.getValueString());
    this.view.render(objectsToRender);
  };
}
