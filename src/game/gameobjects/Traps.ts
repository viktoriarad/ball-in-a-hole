import { ITraps, ICircle } from "../interfaces/gameobjects.js";
import { Size } from "../interfaces/gametypes.js";
import { Hole } from "./Hole.js";

export class Traps implements ITraps {
  private readonly traps: Array<ICircle>;
  private readonly ballRadius: number;

  constructor(_ballRadius: number) {
    this.traps = [];
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
  public generateTraps(level: number, finishHole: ICircle, ball: ICircle, star: ICircle, fieldSize: Size): void {
    const trapsAmount: number = 5 + level * 2;
    const radius: number = this.ballRadius + level;

    this.clearTraps();

    while (this.traps.length <= trapsAmount) {
      const generatedTrap: ICircle = this.generateTrap(radius, finishHole, ball, star, fieldSize);

      if (generatedTrap.radius !== 0) {
        this.traps.push(generatedTrap);
      }
    }
  };

  /**
   * Funkcja generuje pulapke i sprawdza aby sie nie znajdowala zablisko obok innych elementow gry
   * @returns {void}
   */
  private generateTrap(radius: number, finishHole: ICircle, ball: ICircle, star: ICircle, fieldSize: Size): ICircle {
    const x: number = Math.floor(Math.random() * (fieldSize.width - radius * 2) + radius);
    const y: number = Math.floor(Math.random() * (fieldSize.height - radius * 2) + radius);

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

    const starCrossing: boolean = (
      Math.abs(star.x - x) - star.radius - radius <= 0 &&
      Math.abs(star.y - y) - star.radius - radius <= 0
    );

    if (trapCrossing || ballCrossing || finishCrossing || starCrossing) {
      return new Hole(0, 0, 0);
    } else {
      return new Hole(radius, x, y);
    }
  };

  /**
   * Funkcja zwraca tablice ze wszystkimi pulapkami na planszy gry.
   * @returns {Array}
   */
  public getAll(): Array<ICircle> {
    return this.traps;
  };

  /**
   * Funkcja zmniejsza ilosc pulapek o podana wartosc razy.
   * @returns {void}
   */
  public decreaseTraps(rate: number): void {
    const decreasedTraps: Array<ICircle> = [];

    for (let i: number = 0; i < this.traps.length; i++) {
      if (i % rate === 0) {
        decreasedTraps.push(this.traps[i]);
      }
    }

    this.traps.length = 0;

    for (let i: number = 0; i < decreasedTraps.length; i++) {
      this.traps.push(decreasedTraps[i]);
    }

  };

  /**
   * Funkcja wyczyszcza tablice ze wszystkimi pulapkami na planszy gry.
   * @returns {void}
   */
  private clearTraps(): void {
    this.traps.length = 0;
  };

}
