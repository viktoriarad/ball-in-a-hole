export interface IPosition {
  x: number;
  y: number;
}

export interface ITime {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ISize {
  width: number;
  height: number;
}

export interface IOrientation {
  default: string;
  current: string;
  reversed: boolean;
}
