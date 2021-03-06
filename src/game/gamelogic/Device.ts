import { IDevice, IGame } from "../interfaces/gameobjects.js";
import { IOrientation, ISize, IPosition } from "../interfaces/gametypes.js";

export class Device  implements IDevice {
  private motionPermission: boolean = false;
  public readonly isiOS: boolean;
  public readonly iPhoneWithHomeIndicator: boolean;
  public readonly isAndroid: boolean;
  private screenSize: ISize;
  private readonly game: IGame;

  constructor(_game: IGame) {
    this.game = _game;
    this.isAndroid = /android/i.test(navigator.userAgent);
    this.isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    this.iPhoneWithHomeIndicator = this.isiPhoneWithHomeIndicator();
    this.screenSize = this.defineScreenSize();

    if (this.isAndroid) {
      document.body.classList.add('android');
    } else if (this.isiOS) {
      document.body.classList.add('iOS');
      if (this.iPhoneWithHomeIndicator) {
        document.body.classList.add('iPhoneWithHomeIndicator');
      }
    }
  };

  /**
   * @returns {void}
   */
  public setupDeviceHandlers(): void {
    this.setOrientationChangeEventHandler();
    this.setResizeEventHandler();
    this.checkFullScreenAPI();
  };

  /** Funkcja definiuje czy urzadzenie posdiada home indicator jak iPhone X
   * @returns {boolean}
   */
  public isiPhoneWithHomeIndicator(): boolean {
    const ratio = window.devicePixelRatio || 1;
    const screen: ISize = {
      width: window.screen.height * ratio,
      height: window.screen.height * ratio,
    };
    const hasDimensions = (size: ISize) => {
      return (screen.width === size.width && screen.height === screen.height) ||
        (screen.width === size.height && screen.height === screen.width);
    };

    const isIphoneX: boolean = hasDimensions({width: 1125, height: 2436});
    const isIphoneXS: boolean = hasDimensions({width: 1125, height: 2436});
    const isIphoneXSMax: boolean = hasDimensions({width: 1242, height: 2688});
    const isIphoneXR: boolean = hasDimensions({width: 828, height: 1792});

    return (isIphoneX || isIphoneXS || isIphoneXSMax || isIphoneXR);
  };

  /**
   * Funkcja prosi o pozwolenie aby sie korzystac z API sensorow urzadzenia.
   * @returns {boolean} True lub false jesli pozwolenie nie zostalo nadane.
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
      alert('DeviceMotionEvent nie istnieje. Nie mozesz zagrac w gre.');
    }

    return this.motionPermission;
  };

  /**
   * Funkcja zwraca rozmiar ekranu urzadzenia w pixeliach.
   * @returns {ISize} Obiekt z wysokoscia i szerokoscia.
   */
  public getScreenSize(): ISize {
    return this.screenSize;
  };

  /**
   * Funkcja dodaje nasłuchiwanie na zmianę orientacji urządzenia.
   * @returns {void}
   */
  public setOrientationChangeEventHandler(): void {
    window.addEventListener('orientationchange', this.onOrientationChange.bind(this));
  };

  /**
   * Funkcja dodaje nasłuchiwanie na zmianę polozenia urzadzenia.
   * @returns {void}
   */
  public setDeviceOrientationEventHandler(): void {
    window.addEventListener('deviceorientation', this.onOrientationEvent.bind(this));
  };

  /**
   * Funkcja dodaje nasłuchiwanie na zmianę rozmiaru stronki (globalny obiekt window).
   * @returns {void}
   */
  private setResizeEventHandler(): void {
    window.addEventListener('resize', this.onResizeEvent.bind(this));
  };

  /**
   * Funkcja obsluguje zdarzenia zmiany rozmiaru stronki.
   * @returns {void}
   */
  private onResizeEvent(): void {
    this.checkFullScreenAPI();
    this.game.onResize(this.defineScreenSize());
  };

  /**
   * Funkcja obsluguje zdarzenia zmiany polozenia urzadzenia, przekazywuje te dane do glownego obiektu game
   * @returns {void}
   */
  private onOrientationEvent(e: DeviceOrientationEvent): void {
    if (this.isPortrait) return;

    const x: number = parseFloat((<number>e.beta).toFixed(1));
    const y: number = parseFloat((<number>e.gamma).toFixed(1));

    this.game.accelerate({ x, y });
  };

  /**
   * Funkcja obsluguje zdarzenia zmiany orientacji urzadzenia
   * @returns {void}
   */
  private onOrientationChange(): void {
    this.screenSize = this.defineScreenSize();
    this.game.onOrientationChange();
  };

  private checkFullScreenAPI(): void {
    const fullScreenEnabled: boolean = document.fullscreenEnabled || document.webkitFullscreenEnabled;
    const isInFullScreen: boolean = document.fullscreenElement || document.webkitFullscreenElement ? true : false;

    if (fullScreenEnabled && !isInFullScreen) {
      this.game.requestFullScreen();
    }
  }

  public setFullScreen(): void {
    if (document.body.requestFullscreen) {
      document.body.requestFullscreen();
    } else if (document.body.webkitRequestFullscreen) {
      document.body.webkitRequestFullscreen();
    }
  }

  /**
   * Funkcja definiuje rozmiar ekranu urzadzenia w pixeliach
   * @returns {ISize} Obiekt z wysokoscia i szerokoscia.
   */
  public defineScreenSize(): ISize {
    const screenSize: ISize = { width: 0, height: 0 };

    if (this.isiOS) {
      screenSize.width = window.screen.width;
      screenSize.height = window.screen.height;
    } else {
      screenSize.width = window.outerWidth;
      screenSize.height = window.outerHeight;
    }

    return screenSize;
  };

  /**
   * Funkcja zwraca wlasciwosci dotyczace orientacji urzadzenia
   * @returns {IOrientation} Zwraca obiekt z trzema wlasciwosciami.
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
   * Funkcja sparwdza czy urzadzenie jest w landscape widoku
   * @returns {boolean} True lub false
   */
  get isLandscape(): boolean {
    if (window.screen.orientation && window.screen.orientation.type) {
      return window.screen.orientation.type.toLowerCase().includes("landscape");
    } else {
      return this.getOrientation().current === 'landscape';
    }
  };

  /**
   * Funkcja sparwdza czy urzadzenie jest w portrait widoku
   * @returns {boolean} True lub false
   */
  get isPortrait(): boolean {
    if (window.screen.orientation && window.screen.orientation.type) {
      return window.screen.orientation.type.toLowerCase().includes("portrait");
    } else {
      return this.getOrientation().current === 'portrait';
    }
  };

}
