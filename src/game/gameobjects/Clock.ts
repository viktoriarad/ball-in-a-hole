import { ITime } from '../interfaces/gametypes.js';
import { IClock } from '../interfaces/gameobjects.js';

export class Clock implements IClock {
  private value: ITime;
  private intervalId: number = -1;

  constructor() {
    this.value = { hours: 0, minutes: 0, seconds: 0 };
  };

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

  public start(): void {
    this.value = {hours: 0, minutes: 0, seconds: 0};
    this.stopTick();
    this.intervalId = window.setInterval(this.tick.bind(this),1000);
  };

  public pause(): void {
    this.stopTick();
  };

  private stopTick(): void {
    if (this.intervalId >= 0) {
      window.clearInterval(this.intervalId);
    }
  }

  public resume(): void {
    this.intervalId = window.setInterval(this.tick.bind(this),1000);
  };

  public getValue(): ITime {
    return this.value;
  };

  public getValueInSecs(): number {
    return (this.value.hours * 3600) + (this.value.minutes * 60) + this.value.seconds;
  };

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
  }
}