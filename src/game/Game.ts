import { IBall, IFinish, IView, IDevice, ITraps, IState, IGame, IGameObjects } from "./interfaces/gameobjects.js";
import { ISize, IOrientation, IPosition } from "./interfaces/gametypes.js";
import { Device, View, State } from './gamelogic/index.js';
import { Ball, Finish, Traps } from './gameobjects/index.js';

export class Game implements IGame {

  private readonly device: IDevice;
  private readonly fieldSize: ISize;
  private readonly view: IView;
  private readonly ball: IBall;
  private readonly finish: IFinish;
  private readonly traps: ITraps;
  private state: IState;
  private level: number;

  constructor(ballRadius: number) {
    this.device = new Device(this);
    this.fieldSize = this.getFieldSize(this.device.getScreenSize());

    this.view = new View(this, this.fieldSize);

    this.ball = new Ball(this.fieldSize, ballRadius);
    this.finish = new Finish(this.fieldSize, ballRadius);
    this.traps = new Traps(this.fieldSize, ballRadius);

    this.state = new State();
    this.level = 0;
  };

  onPressStartBtn(): void {
    if (this.device.isiOS) {
      this.device.requestSensorsPermission();
    } else {
      this.start();
    }
  };

  start(): void {
    this.view.onStart();
    this.nextLevel();
    this.render();
    // this.device.setDeviceMotionEventHandler();
    this.device.setDeviceOrientationEventHandler();
  };

  /**
   * Funkcja restartuje gre
   * @returns {void}
   */
  nextLevel(): void {
    this.level += 1;

    this.ball.generateNewPosition();
    this.finish.generateNewPosition();
    this.traps.generateTraps(this.level, this.finish, this.ball);

    this.state.start();
  };

  resume(): void {
    this.state.start();
  };

  pause(): void {
    this.state.pause();
  };

  /**
   * Funkcja restartuje gre
   * @returns {void}
   */
  restart(): void {
    this.level = 0;
    this.nextLevel();
  };

  getFieldSize(screenSize: ISize): ISize {
    return {
      width: screenSize.width > screenSize.height ? screenSize.width : screenSize.height,
      height: screenSize.width > screenSize.height ? screenSize.height : screenSize.width
    };
  }

  /**
   * Funkcja konczy gre z przegranym wynikiem
   * @returns {void}
   */
  public gameOver(): void {
    this.state.over();
  };

  /**
   * Funkcja konczy gre z wygranym wynikiem
   * @returns {void}
   */
  public win(): void {
    this.state.win();
  };

  /**
   * Funkcja zwraca obiekty gry
   * @returns {IGameObjects} {{ball: IBall, traps: Array<ICircle>, finish: ICircle}}
   */
  public getGameObjects(): IGameObjects {
    return {
      ball: this.ball,
      traps: this.traps.getAll(),
      finish: this.finish
    }
  };

  /**
   * Funkcja sprawdza czy gra jest wygrana
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
   * @returns {boolean} True or false
   */
  public onOrientationChange(): void {
    this.state.pause();

    if (this.device.isPortrait) {
      this.view.onPortrait();
    } else {
      this.view.onLandscape();
      this.updateLandscapeView();
    }

    this.render();
  };

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
   * Funkcja przesuwa pilke na odpowiednia ilosc pixeli
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
    }
  };

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
   * Funkcja odpowiedzialna za rendering widoku gry
   * @returns {void}
   */
  private render(): void {
    if (!this.state.isActive()) return;

    const objectsToRender: IGameObjects = this.getGameObjects();
    this.view.render(objectsToRender);
  };
}
