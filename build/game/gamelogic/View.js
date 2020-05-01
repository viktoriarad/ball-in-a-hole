export class View {
    constructor(_game, _fieldSize) {
        this.game = _game;
        this.fieldSize = _fieldSize;
        this.body = document.body;
        this.canvas = this.createHTMLElement("canvas");
        this.canvas.width = this.fieldSize.width;
        this.canvas.height = this.fieldSize.height;
        this.ctx = this.canvas.getContext("2d");
        this.addHTMLElement(this.body, this.canvas);
        // Tworzymy popupy z komunikatami dla roznych przypadkow
        this.rotateMsg = this.createHTMLElement("div", "rotate-msg");
        this.addHTMLElement(this.body, this.rotateMsg);
        this.fullScreenMsg = this.createHTMLElement("div", "fullscreen-msg");
        this.fullScreenMsg.classList.add("invisible");
        this.addHTMLElement(this.body, this.fullScreenMsg);
        this.addEventListener(this.fullScreenMsg, "click", this.onTouchFullScreenMsg.bind(this));
        this.pauseMsg = this.createHTMLElement("div", "pause-msg");
        this.pauseMsg.classList.add("invisible");
        this.addHTMLElement(this.body, this.pauseMsg);
        this.addEventListener(this.pauseMsg, "click", this.onTouchPauseMsg.bind(this));
        this.gameOverMsg = this.createHTMLElement("div", "gameover-msg");
        this.gameOverMsg.classList.add("invisible");
        this.addHTMLElement(this.body, this.gameOverMsg);
        this.addEventListener(this.gameOverMsg, "click", this.onTouchGameOverMsg.bind(this));
        this.nextLevelMsg = this.createHTMLElement("div", "nextlevel-msg");
        this.nextLevelMsg.classList.add("invisible");
        this.addHTMLElement(this.body, this.nextLevelMsg);
        this.addEventListener(this.nextLevelMsg, "click", this.onTouchNextLevelMsg.bind(this));
        this.startGameBtn = this.createHTMLElement("button", "start-game");
        this.addHTMLElement(this.body, this.startGameBtn);
        this.addEventListener(this.startGameBtn, "click", this.onPressStartGameBtn.bind(this));
    }
    ;
    /**
     * Funkcja tworzy canvas
     * @returns {void}
     */
    updateCanvasSize() {
        this.canvas.width = this.fieldSize.width;
        this.canvas.height = this.fieldSize.height;
    }
    ;
    /**
     * Funkcja tworzy canvas
     * @returns {void}
     */
    updateFieldSize() {
        this.fieldSize = this.game.getFieldSize();
    }
    ;
    /**
     * Funkcja wyswietla komunikat z przegranej
     * @returns {void}
     */
    gameOver() {
        this.gameOverMsg.classList.remove('invisible');
    }
    ;
    /**
     * Funkcja wyswietla komunikat z wygranej
     * @returns {void}
     */
    win() {
        this.nextLevelMsg.classList.remove('invisible');
    }
    ;
    /**
     * Funkcja tworzy HTMLElement z podanym tagiem i CSS klasa
     * @returns {HTMLElement}
     */
    createHTMLElement(tag, cssClass = "") {
        const element = document.createElement(tag);
        if (cssClass !== "") {
            element.classList.add(cssClass);
        }
        return element;
    }
    ;
    /**
     * Funkcja dodaje HTMLElement do innego
     * @returns {void}
     */
    addHTMLElement(parent, child) {
        parent.appendChild(child);
    }
    ;
    /**
     * Funkcja obsluguje dodanie eventListnera do elementu
     * @returns {void}
     */
    addEventListener(target, type, eventListener) {
        target.addEventListener(type, eventListener);
    }
    ;
    /**
     * Funkcja wyswietla komunikat z FullScreen trybem
     * @returns {void}
     */
    showFullScreenMsg() {
        this.fullScreenMsg.classList.remove('invisible');
    }
    ;
    /**
     * Funkcja oblsuguje event nacisniecia na komunikat z FullScreen trybem
     * @returns {void}
     */
    onTouchFullScreenMsg() {
        this.fullScreenMsg.classList.add('invisible');
        this.game.setFullScreen();
    }
    ;
    /**
     * Funkcja oblsuguje event nacisniecia komunikata z pausa
     * @returns {void}
     */
    onTouchPauseMsg() {
        this.pauseMsg.classList.add('invisible');
        this.game.resume();
    }
    ;
    /**
     * Funkcja oblsuguje event nacisniecia komunikata z przegranej
     * @returns {void}
     */
    onTouchGameOverMsg() {
        this.gameOverMsg.classList.add('invisible');
        this.game.restart();
    }
    ;
    /**
     * Funkcja oblsuguje event nacisniecia komunikata z nastepnym levelem
     * @returns {void}
     */
    onTouchNextLevelMsg() {
        this.nextLevelMsg.classList.add('invisible');
        this.game.nextLevel();
    }
    ;
    /**
     * Funkcja oblsuguje event nacisniecia przycisku Start
     * @returns {void}
     */
    onPressStartGameBtn() {
        this.updateFieldSize();
        this.updateCanvasSize();
        this.game.onPressStartBtn();
    }
    ;
    /**
     * Funkcja ukrywa przycisk Start
     * @returns {void}
     */
    onStart() {
        this.startGameBtn.classList.add('invisible');
    }
    ;
    /**
     * Funkcja odpowiada za widok gry w portrecie
     * @returns {void}
     */
    onPortrait() {
        this.rotateMsg.classList.remove('invisible');
        this.gameOverMsg.classList.add('invisible');
        this.nextLevelMsg.classList.add('invisible');
        this.pauseMsg.classList.add('invisible');
    }
    ;
    /**
     * Funkcja odpowiada za widok gry w landscape
     * @returns {void}
     */
    onLandscape() {
        this.rotateMsg.classList.add('invisible');
    }
    ;
    /**
     * Funkcja wyswietla komunikat z pauza
     * @returns {void}
     */
    onPause() {
        this.pauseMsg.classList.remove('invisible');
    }
    ;
    /**
     * Funkcja wyswietla komunikat z wygranej
     * @returns {void}
     */
    onWin() {
        this.nextLevelMsg.classList.remove('invisible');
    }
    ;
    /**
     * Funkcja wyswietla komunikat z przegranej
     * @returns {void}
     */
    onGameOver() {
        this.gameOverMsg.classList.remove('invisible');
    }
    ;
    /**
     * Funkcja odpowiedzialna za rendering canvasu
     * @returns {void} Zwraca true jesli canvas zostal wyrendorowany lub false jesli nie
     */
    render(objectsToRender) {
        const ball = objectsToRender.ball;
        const traps = objectsToRender.traps;
        const finish = objectsToRender.finish;
        this.ctx.clearRect(0, 0, this.fieldSize.width, this.fieldSize.height);
        this.ctx.fillStyle = "#00135d";
        this.ctx.fillRect(0, 0, this.fieldSize.width, this.fieldSize.height);
        traps.forEach((trap) => {
            this.ctx.beginPath();
            this.ctx.arc(trap.x, trap.y, trap.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = "#c90c0b";
            this.ctx.fill();
            this.ctx.closePath();
        });
        this.ctx.beginPath();
        this.ctx.arc(finish.x, finish.y, finish.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "#2bc932";
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "#c9c9c9";
        this.ctx.fill();
        this.ctx.closePath();
    }
    ;
}
//# sourceMappingURL=View.js.map