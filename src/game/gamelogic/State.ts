import { IState } from '../interfaces/gameobjects.js';

enum States {
  INIT,
  PLAY,
  PAUSE,
  WIN,
  OVER
}

export class State implements IState {
  private state: States;

  constructor() {
    this.state = States.INIT;
  }

  /**
   * Funkcja zmienia stan gry na wystartowany
   * @returns {void}
   */
  public start(): void {
    this.state = States.PLAY;
  };

  /**
   * Funkcja sprawdza czy gra sie wystartowala
   * @returns {boolean} True or false
   */
  public isStarted(): boolean {
    return this.state === States.PLAY || this.state === States.PAUSE;
  };

  /**
   * Funkcja sprawdza czy gra sie wystartowala
   * @returns {boolean} True or false
   */
  public isActive(): boolean {
    return this.state === States.PLAY;
  };

  /**
   * Funkcja zmienia stan gry na zatrzymany
   * @returns {void}
   */
  public pause(): void {
    if (this.state === States.PLAY) {
      this.state = States.PAUSE;
    }
  };

  /**
   * Funkcja sprawdza czy gra jest w pauzie
   * @returns {boolean} True or false
   */
  public isPaused(): boolean {
    return this.state === States.PAUSE;
  };

  /**
   * Funkcja sprawdza czy gra jest wygrana
   * @returns {boolean} True or false
   */
  public isWin(): boolean {
    return this.state === States.WIN;
  };

  /**
   * Funkcja sprawdza czy gra jest przegrana
   * @returns {boolean} True or false
   */
  public isGameOver(): boolean {
    return this.state === States.OVER;
  };

  /**
   * Funkcja konczy gre z przegranym wynikiem
   * @returns {void}
   */
  public over(): void {
    this.state = States.OVER;
  };

  /**
   * Funkcja konczy gre z wygranym wynikiem
   * @returns {void}
   */
  public win(): void {
    this.state = States.WIN;
  };
}
