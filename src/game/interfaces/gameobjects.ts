import { Orientation, Position, Size } from "./gametypes";

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
  moveBy(position: Position): void;
  generateNewPosition(fieldSize: Size): void;
}

export interface IFinish extends ICircle {
  checkIfBallGotInside(ball: ICircle): boolean;
  generateNewPosition(fieldSize: Size): void;
}

export interface IGame {
  start(): void;
  resume(): void;
  nextLevel(): void;
  pause(): void;
  restart(): void;
  accelerate(coords: Position): void;
  onOrientationChange(): void;
  onPressStartBtn(): void;
  getFieldSize(): Size;
  onResize(screenSize: Size): void;
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
  iPhoneWithHomeIndicator: boolean;
  isAndroid: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
  getScreenSize(): Size;
  getOrientation(): Orientation;
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
  generateTraps(level: number, finishHole: ICircle, ball: ICircle, star: ICircle, fieldSize: Size): void;
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
  drawPoints: Array<Position>;
  visible: boolean;
  checkIfBallGotInside(ball: ICircle): boolean;
  generate(fieldSize: Size): void;
  hide(): void;
}
