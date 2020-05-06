import { ICircle } from '../interfaces/gameobjects.js';

export class Circle implements ICircle {
  protected _x: number;
  protected _y: number;
  protected _radius: number;

  constructor(radius: number, x: number = 0, y: number = 0) {
    this._radius = radius;
    this._x = x;
    this._y = y;
  };

  get x(): number {
    return this._x;
  };

  get y(): number {
    return this._y;
  };

  get radius(): number {
    return this._radius;
  };

  set x(value: number) {
    this._x = value;
  };

  set y(value: number) {
    this._y = value;
  };

  set radius(value: number) {
    this._radius = value;
  };

}
