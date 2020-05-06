import { ICircle, IFinish } from '../interfaces/gameobjects.js';
import { Circle } from './Circle.js';
import { ISize } from "../interfaces/gametypes.js";

export class Finish extends Circle implements IFinish {

  constructor(ballRadius: number) {
    super(ballRadius * 1.5);
  };

  /**
   * Funkcja generuje i przypisuje nowa pozycje dla dziury finiszowej na planszy gry.
   * @returns {void}
   */
  public generateNewPosition(fieldSize: ISize): void {
    this._x = Math.floor(Math.random() * (fieldSize.width * 0.2) + this._radius);
    this._y = Math.floor(Math.random() * (fieldSize.height - this._radius * 2) + this._radius);
  };

  /**
   * Funkcja sprawdza czy pilka trafila do dziury finiszowej.
   * @returns {boolean} True jesli trafila lub false jesli nie.
   */
  public checkIfBallGotInside(ball: ICircle): boolean {
    const x: boolean = (Math.abs(this._x - ball.x) - this._radius) <= 0;
    const y: boolean = (Math.abs(this._y - ball.y) - this._radius) <= 0;

    return x && y;
  };

}
