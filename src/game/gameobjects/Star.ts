import { ICircle, IStar } from '../interfaces/gameobjects.js';
import { Circle } from './Circle.js';
import { ISize, IPosition } from "../interfaces/gametypes.js";

export class Star extends Circle implements IStar {

  public drawPoints: Array<IPosition> = [];
  public visible: boolean = true;

  constructor(ballRadius: number) {
    super(ballRadius * 1.5);
  };

  /**
   * Funkcja generuje i przypisuje nowa pozycje dla gwiazdki na planszy gry.
   * @returns {void}
   */
  public generate(fieldSize: ISize): void {
    this.visible = true;

    this.generateNewPosition(fieldSize);
    this.generateDrawPoints();
  };

  /**
   * Funkcja generuje i przypisuje nowa pozycje dla gwiazdki na planszy gry.
   * @returns {void}
   */
  private generateNewPosition(fieldSize: ISize): void {
    this.visible = true;

    this._x = Math.floor((fieldSize.width * 0.4) + Math.random() * (fieldSize.width * 0.2) + this._radius);
    this._y = Math.floor(Math.random() * (fieldSize.height - this._radius * 2) + this._radius);

    this.generateDrawPoints();
  };

  private generateDrawPoints(): void {
    let rot: number = Math.PI / 2 * 3;
    const step: number = Math.PI / 5;

    this.drawPoints.length = 0;

    this.drawPoints.push({x: this._x, y: (this._y - this._radius)});

    for (let i: number = 0; i < 5; i++) {
      let x: number = this._x + Math.cos(rot) * this._radius;
      let y: number = this._y + Math.sin(rot) * this._radius;
      this.drawPoints.push({x, y});
      rot += step;

      x  = this._x + Math.cos(rot) * this._radius / 2;
      y = this._y + Math.sin(rot) * this._radius / 2;
      this.drawPoints.push({x, y});
      rot += step;
    }
  };

  /**
   * Funkcja sprawdza czy pilka trafila do gwiazdki.
   * @returns {boolean} True jesli trafila lub false jesli nie.
   */
  public checkIfBallGotInside(ball: ICircle): boolean {
    const x: boolean = (Math.abs(this._x - ball.x) - this._radius) <= 0;
    const y: boolean = (Math.abs(this._y - ball.y) - this._radius) <= 0;

    return x && y;
  };

  /**
   * Funkcja sprawdza czy pilka trafila do gwiazdki.
   * @returns {boolean} True jesli trafila lub false jesli nie.
   */
  public hide(): void {
    this.visible = false;
  };

}
