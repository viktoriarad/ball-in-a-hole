import { IOrientation, IPosition, ISize } from "./gametypes";

export interface ICircle {
  x: number;
  y: number;
  radius: number;
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
  restart(): void;
  accelerate(coords: IPosition): void;
  onOrientationChange(): void;
  onPressStartBtn(): void;
  getFieldSize(): ISize;
  onResize(screenSize: ISize): void;
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
}

export interface IDevice {
  isiOS: boolean
  isPortrait: boolean;
  isLandscape: boolean;
  getScreenSize(): ISize;
  getOrientation(): IOrientation;
  requestSensorsPermission(): void;
  setDeviceOrientationEventHandler(): void;
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
  generateTraps(level: number, finishHole: ICircle, ball: ICircle, fieldSize: ISize): void;
  checkIfBallGotInside(ball: ICircle): boolean;
  getAll(): Array<ICircle>;
}

export interface IGameObjects {
  ball: IBall;
  traps: Array<ICircle>;
  finish: ICircle;
}
