import { IDevice, IGame } from "../interfaces/gameobjects.js";
import { IOrientation, ISize, IPosition } from "../interfaces/gametypes.js";

export class Device  implements IDevice {
  private motionPermission: boolean = false;
  public readonly isiOS: boolean;
  private readonly screenSize: ISize;
  private readonly game: IGame;

  constructor(_game: IGame) {
    this.game = _game;
    this.isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    this.screenSize = this.defineScreenSize();

    this.setOrientationChangeEventHandler();
  }

  /**
   * Funkcja prosi o pozwolenie aby sie korzystac z API sensorow
   * @returns {boolean} True if permission was granted and false if not.
   */
  requestSensorsPermission(): boolean {
    if (this.motionPermission) {
      this.game.start();

      return this.motionPermission;
    }

    if (typeof (DeviceMotionEvent) !== 'undefined' && typeof (DeviceMotionEvent.requestPermission) === 'function') {
      DeviceMotionEvent.requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            this.motionPermission = true;
            this.game.start();
          }
        })
        .catch(console.error)
    } else {
      alert('DeviceMotionEvent is not defined. Sorry you can\'t play this game!');
    }

    return this.motionPermission;
  };

  /**
   * Funkcja zwraca rozmiar ekranu urzadzenia w pixeliach
   * @returns {{width: {number}, height: {number}}} Object with width and height.
   */
  public getScreenSize(): ISize {
    return this.screenSize;
  };

  /**
   * Funkcja dodaje nasłuchiwanie na zmianę orientacji urządzenia
   * @returns {{width: {number}, height: {number}}} Object with width and height.
   */
  public setOrientationChangeEventHandler(): void {
    window.addEventListener('orientationchange', this.onOrientationChange.bind(this));
  };

  public setDeviceOrientationEventHandler(): void {
    window.addEventListener('deviceorientation', this.onOrientationEvent.bind(this));
  };

  private onOrientationEvent(e: DeviceOrientationEvent): void {
    const x: number = parseFloat((<number>e.beta).toFixed(1));
    const y: number = parseFloat((<number>e.gamma).toFixed(1));

    this.game.accelerate({ x, y });
  };

  /**
   * Funkcja dodaje nasłuchiwanie na ruch urządzenia w trzech wymiarach (x, y, z)
   * @returns {{width: {number}, height: {number}}} Object with width and height.
   */
  public setDeviceMotionEventHandler(): void {
    window.addEventListener('devicemotion', this.onMotionEvent.bind(this));
  };

  /**
   * Funkcja obsluguje eventy sensorow urzadzenia
   * @returns {void}
   */
  onOrientationChange() : void {
    this.game.onOrientationChange();
  };

  /**
   * Funkcja obsluguje eventy sensorow urzadzenia
   * @param {object} e Event sensorow
   */
  onMotionEvent(e: DeviceMotionEvent) : void {
    const acceleration = <DeviceMotionEventAcceleration>e.accelerationIncludingGravity;
    const x: number = parseFloat((<number>acceleration.x).toFixed(1));
    const y: number = parseFloat((<number>acceleration.y).toFixed(1));

    this.game.accelerate({ x, y });
  };

  /**
   * Funkcja definiuje rozmiar ekranu urzadzenia w pixeliach
   * @returns {{width: {number}, height: {number}}} Object with width and height.
   */
  public defineScreenSize(): ISize {
    const screenSize: ISize = { width: 0, height: 0 };

    if (this.isiOS) {
      screenSize.width = window.screen.width;
      screenSize.height = window.screen.height;
    } else {
      screenSize.width = window.innerWidth;
      screenSize.height = window.innerHeight;
    }

    return screenSize;
  };

  /**
   * Funkcja zwraca wlasciwosci dotyczace orientacji urzadzenia
   * @returns {{default: {string}, current: {string}, reversed: {boolean}}} Returns object with three properties
   */
  getOrientation(): IOrientation {
    const defaultOrientation = this.screenSize.width > this.screenSize.height ? 'landscape' : 'portrait';
    const orientation: IOrientation = {default: defaultOrientation, current: defaultOrientation, reversed: false};

    switch (window.orientation) {
      case 0:
        orientation.current = defaultOrientation;
        break;
      case 90:
        orientation.current = defaultOrientation === 'landscape' ? 'portrait' : 'landscape';
        break;
      case -90:
        orientation.current = defaultOrientation === 'landscape' ? 'portrait' : 'landscape';
        if (orientation.default === 'portrait') orientation.reversed = true;
        break;
      default:
        orientation.current = defaultOrientation;
        break;
    }

    return orientation;
  };

  /**
   * Funkcja sparwdza czy urzadzenie jest w landscape mode
   * @returns {boolean} True or false
   */
  get isLandscape(): boolean {
    return this.getOrientation().current === 'landscape';
  }

  /**
   * Funkcja sparwdza czy urzadzenie jest w portrait mode
   * @returns {boolean} True or false
   */
  get isPortrait(): boolean {
    return this.getOrientation().current === 'portrait';
  }

}
