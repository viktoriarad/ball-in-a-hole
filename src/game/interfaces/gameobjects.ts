import { IOrientation, IPosition, ISize } from "./gametypes";

export interface ICircle {
  x: number;
  y: number;
  radius: number;
}

export interface IClock {
  start(): void;
  pause(): void;
  resume(): void;
  getValueInSecs(): number;
  getValueString(): string;
}

export interface IBall extends ICircle {
  moveBy(position: IPosition): void;
  generateNewPosition(fieldSize: ISize): void;
}

export interface IFinish extends ICircle {
  checkIfBallGotInside(ball: ICircle): boolean;
  generateNewPosition(fieldSize: ISize): void;
}

export interface IGame {
  start(): void;
  resume(): void;
  nextLevel(): void;
  pause(): void;
  restart(): void;
  accelerate(coords: IPosition): void;
  onOrientationChange(): void;
  onPressStartBtn(): void;
  getFieldSize(): ISize;
  onResize(screenSize: ISize): void;
  setFullScreen(): void;
  requestFullScreen(): void;
}

export interface IView {
  onStart(): void;
  render(objectsToRender: IGameObjects): void;
  gameOver(): void;
  win(): void;
  onPortrait(): void;
  onLandscape(): void;
  onPause(): void;
  onGameOver(): void;
  onWin(): void;
  showFullScreenMsg(): void;
  updateGamePanel(score: number, level: number, time: string): void;
  updateTimeInfo(time: string): void;
}

export interface IDevice {
  isiOS: boolean
  isPortrait: boolean;
  isLandscape: boolean;
  getScreenSize(): ISize;
  getOrientation(): IOrientation;
  requestSensorsPermission(): void;
  setDeviceOrientationEventHandler(): void;
  setFullScreen(): void;
  setupDeviceHandlers(): void;
}

export interface IState {
  start(): void;
  pause(): void;
  over(): void;
  win(): void;
  isActive(): boolean;
  isStarted(): boolean;
  isPaused(): boolean;
  isWin(): boolean;
  isGameOver(): boolean;
}

export interface ITraps {
  generateTraps(level: number, finishHole: ICircle, ball: ICircle, star: ICircle, fieldSize: ISize): void;
  checkIfBallGotInside(ball: ICircle): boolean;
  getAll(): Array<ICircle>;
  decreaseTraps(rate: number): void;
}

export interface IGameObjects {
  ball: IBall;
  traps: Array<ICircle>;
  finish: ICircle;
  star: IStar;
}

export interface IStar extends ICircle {
  drawPoints: Array<IPosition>;
  visible: boolean;
  checkIfBallGotInside(ball: ICircle): boolean;
  generate(fieldSize: ISize): void;
  hide(): void;
}
