import { IBall } from '../interfaces/gameobjects.js';
import { IPosition, ISize } from "../interfaces/gametypes.js";
import { Circle } from './Circle.js';

export class Ball extends Circle implements IBall {
  private readonly fieldSize: ISize;

  constructor(_fieldSize: ISize, ballRadius: number) {
    super(ballRadius);
    this.fieldSize = _fieldSize;
  }

  /**
   * Funkcja generuje i przypisuje nowa pozycje dla pilki na planszy gry.
   * @returns {void}
   */
  public generateNewPosition(): void {
    this._x = Math.floor((this.fieldSize.width * 0.8) + Math.random() * (this.fieldSize.width * 0.2) - this._radius);
    this._y = Math.floor(Math.random() * (this.fieldSize.height - this._radius * 2) + this._radius);
  };

  /**
   * Funkcja przesuwa pilke o podana ilosc wedlug wspolrzednych x i y.
   * @returns {void}
   */
  public moveBy(position: IPosition): void {
    this._x -= position.x;
    this._y -= position.y;
  };

}
