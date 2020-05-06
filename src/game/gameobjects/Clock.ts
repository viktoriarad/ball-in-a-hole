import { ITime } from '../interfaces/gametypes.js';
import { IClock } from '../interfaces/gameobjects.js';

export class Clock implements IClock {
  private value: ITime;
  private intervalId: number = -1;

  constructor() {
    this.value = { hours: 0, minutes: 0, seconds: 0 };
  };

  /**
   * Funkcja zwieksza czas o sekunde.
   */
  private tick(): void {
    if (this.value.seconds < 59) {
      this.value.seconds += 1;
    } else if (this.value.minutes < 59) {
      this.value.seconds = 0;
      this.value.minutes += 1;
    } else {
      this.value.seconds = 0;
      this.value.minutes = 0;
      this.value.hours += 1;
    }
  };

  /**
   * Funkcja co sekunde zwieksza czas.
   */
  public start(): void {
    this.value = {hours: 0, minutes: 0, seconds: 0};
    this.stopTick();
    this.intervalId = window.setInterval(this.tick.bind(this),1000);
  };

  /**
   * Funkcja wstrzymuje czas.
   */
  public pause(): void {
    this.stopTick();
  };

  /**
   * Funkcja zatrzymuje czas.
   */
  private stopTick(): void {
    if (this.intervalId >= 0) {
      window.clearInterval(this.intervalId);
    }
  };

  /**
   * Funkcja wznawia zwiekszenie czasu.
   */
  public resume(): void {
    this.intervalId = window.setInterval(this.tick.bind(this),1000);
  };

  /**
   * Funkcja zwraca aktualny czas w formacie { hours: number, minutes: number, seconds: number }.
   */
  public getValue(): ITime {
    return this.value;
  };

  /**
   * Funkcja zwraca aktualny czas w sekundach
   */
  public getValueInSecs(): number {
    return (this.value.hours * 3600) + (this.value.minutes * 60) + this.value.seconds;
  };

  /**
   * Funkcja zwraca aktualny czas w formacie "godziny:minuty:sekundy".
   */
  public getValueString(): string {
    const hr: string = this.value.hours > 0 ?
      this.value.hours > 9 ?
        this.value.hours + ":":
        "0" + this.value.hours + ":":
      "";

    const min: string = this.value.minutes > 9 ?
      this.value.minutes + ":":
      "0" + this.value.minutes + ":";

    const sec: string = this.value.seconds > 9 ?
      "" + this.value.seconds:
      "0" + this.value.seconds;

    return hr + min + sec;
  };
}