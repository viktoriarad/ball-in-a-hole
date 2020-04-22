import { ITraps, ICircle } from "../interfaces/gameobjects.js";
import { ISize } from "../interfaces/gametypes.js";
import { Hole } from "./Hole.js";

export class Traps implements ITraps {
  private readonly traps: Array<ICircle>;
  private readonly fieldSize: ISize;
  private readonly ballRadius: number;

  constructor(_fieldSize: ISize, _ballRadius: number) {
    this.traps = [];
    this.fieldSize = _fieldSize;
    this.ballRadius = _ballRadius;
  };

  /**
   * Funkcja sprawdza czy pilka trafila do jednej z pulapek.
   * @returns {boolean} True jesli trafila lub false jesli nie.
   */
  public checkIfBallGotInside(ball: ICircle): boolean {
    return this.traps.some((trap: ICircle) => {
      const x: boolean = Math.abs(trap.x - ball.x) - trap.radius <= 0;
      const y: boolean = Math.abs(trap.y - ball.y) - trap.radius <= 0;
      return x && y;
    });
  };

  /**
   * Funkcja generuje wszystkie czerwone pulapki
   * @returns {void}
   */
  public generateTraps(level: number, finishHole: ICircle, ball: ICircle): void {
    const trapsAmount: number = 5 + level * 2;
    const radius: number = this.ballRadius + level;

    this.clearTraps();

    for (let i = 0; i <= trapsAmount; i++) {
      this.traps.push(this.generateTrap(radius, finishHole, ball));
    }
  };

  /**
   * Funkcja generuje pulapke i sprawdza aby sie nie znajdowala zablisko obok innych elementow gry
   * @returns {void}
   */
  private generateTrap(radius: number, finishHole: ICircle, ball: ICircle): ICircle {
    const x: number = Math.floor(Math.random() * (this.fieldSize.width - radius * 2) + radius);
    const y: number = Math.floor(Math.random() * (this.fieldSize.height - radius * 2) + radius);

    const trapCrossing: boolean = this.traps.some((hole: ICircle) => {
      const nearX: boolean = Math.abs(hole.x - x) - hole.radius - radius <= 0;
      const nearY: boolean = Math.abs(hole.y - y) - hole.radius - radius <= 0;
      return nearX && nearY;
    });

    const ballCrossing: boolean = (
      Math.abs(ball.x - x) - ball.radius - radius <= radius &&
      Math.abs(ball.y - y) - ball.radius - radius <= radius
    );
    const finishCrossing: boolean = (
      Math.abs(finishHole.x - x) - finishHole.radius - radius <= 0 &&
      Math.abs(finishHole.y - y) - finishHole.radius - radius <= 0
    );

    if (trapCrossing || ballCrossing || finishCrossing) {
      return this.generateTrap(radius, finishHole, ball);
    } else {
      return new Hole(radius, x, y);
    }
  };

  /**
   * Funkcja zwraca tablice ze wszystkimi pulapkami na planszy gry.
   * @returns {Array<ICircle>}
   */
  public getAll(): Array<ICircle> {
    return this.traps;
  };

  /**
   * Funkcja wyczyszcza tablice ze wszystkimi pulapkami na planszy gry.
   * @returns {void}
   */
  private clearTraps(): void {
    this.traps.length = 0;
  };

}
