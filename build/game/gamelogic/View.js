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
        this.rotateMsg = this.createHTMLElement("div", "rotate-msg");
        this.addHTMLElement(this.body, this.rotateMsg);
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
    gameOver() {
        this.gameOverMsg.classList.remove('invisible');
    }
    ;
    win() {
        this.nextLevelMsg.classList.remove('invisible');
    }
    ;
    createHTMLElement(tag, cssClass = "") {
        const element = document.createElement(tag);
        if (cssClass !== "") {
            element.classList.add(cssClass);
        }
        return element;
    }
    ;
    addHTMLElement(parent, child) {
        parent.appendChild(child);
    }
    ;
    addEventListener(target, type, eventListener) {
        target.addEventListener(type, eventListener);
    }
    ;
    onTouchPauseMsg() {
        this.pauseMsg.classList.add('invisible');
        this.game.resume();
    }
    ;
    onTouchGameOverMsg() {
        this.gameOverMsg.classList.add('invisible');
        this.game.restart();
    }
    ;
    onTouchNextLevelMsg() {
        this.nextLevelMsg.classList.add('invisible');
        this.game.nextLevel();
    }
    ;
    onPressStartGameBtn() {
        this.game.onPressStartBtn();
    }
    ;
    onStart() {
        this.startGameBtn.classList.add('invisible');
    }
    ;
    onPortrait() {
        this.rotateMsg.classList.remove('invisible');
        this.gameOverMsg.classList.add('invisible');
        this.nextLevelMsg.classList.add('invisible');
        this.pauseMsg.classList.add('invisible');
    }
    onLandscape() {
        this.rotateMsg.classList.add('invisible');
    }
    onPause() {
        this.pauseMsg.classList.remove('invisible');
    }
    onWin() {
        this.nextLevelMsg.classList.remove('invisible');
    }
    onGameOver() {
        this.gameOverMsg.classList.remove('invisible');
    }
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