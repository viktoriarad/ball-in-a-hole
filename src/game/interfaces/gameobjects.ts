import { IOrientation, IPosition, ISize } from "./gametypes";

export interface ICircle {
  x: number;
  y: number;
  radius: number;
}

export interface IBall extends ICircle {
  moveBy(position: IPosition): void;
  generateNewPosition(): void;
}

export interface IFinish extends ICircle {
  checkIfBallGotInside(ball: ICircle): boolean;
  generateNewPosition(): void;
}

export interface IGame {
  start(): void;
  accelerate(coords: IPosition): void;
  onOrientationChange(): void;
  onPressStartBtn(): void;
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
  getScreenSize(): ISize;
  getOrientation(): IOrientation;
  requestSensorsPermission(): void;
  setDeviceMotionEventHandler(): void;
  isPortrait: boolean;
  isLandscape: boolean;
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
  generateTraps(level: number, finishHole: ICircle, ball: ICircle): void;
  checkIfBallGotInside(ball: ICircle): boolean;
  getAll(): Array<ICircle>;
}

export interface IGameObjects {
  ball: IBall;
  traps: Array<ICircle>;
  finish: ICircle;
}
