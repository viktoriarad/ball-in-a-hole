export type Position = {
  x: number;
  y: number;
}

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
}

export type Size = {
  width: number;
  height: number;
}

export type Orientation = {
  default: string;
  current: string;
  reversed: boolean;
}

export type record = {
  username: string;
  score: number;
}