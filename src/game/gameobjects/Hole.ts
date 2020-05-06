import { Circle } from './Circle.js';

export class Hole extends Circle {
  constructor(radius: number, x: number = 0, y: number = 0) {
    super(radius, x, y);
  };
}
