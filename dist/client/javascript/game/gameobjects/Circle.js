export class Circle {
    constructor(radius, x = 0, y = 0) {
        this._radius = radius;
        this._x = x;
        this._y = y;
    }
    ;
    get x() {
        return this._x;
    }
    ;
    get y() {
        return this._y;
    }
    ;
    get radius() {
        return this._radius;
    }
    ;
    set x(value) {
        this._x = value;
    }
    ;
    set y(value) {
        this._y = value;
    }
    ;
    set radius(value) {
        this._radius = value;
    }
    ;
}
//# sourceMappingURL=Circle.js.map