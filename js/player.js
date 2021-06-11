class Player {
    constructor(x, y, width, height, speed, life){
        this._posicionX = x
        this._posicionY = y
        this._width = width
        this._height = height
        this._speed = speed
        this._life = life
    }

    set img(i){
        this._img = i;
    }

    get img(){
        return this._img;
    }

    set height(h){
        this._height = h;
    }

    get height(){
        return this._height;
    }

    set width(w){
        this._width = w;
    }

    get width(){
        return this._width;
    }

    set posicionX(x){
        this._posicionX = x;
    }

    get posicionX(){
        return this._posicionX;
    }

    set posicionY(y){
        this._posicionY = y;
    }

    get posicionY(){
        return this._posicionY;
    }

    set speed(v){
        this._speed = v;
    }

    get speed(){
        return this._speed;
    }

    set life(l){
        this._life = l;
    }

    get life(){
        return this._life;
    }

    set direction(d){
        this._direction = d;
    }

    get direction(){
        return this._direction;
    }

    hit(){
        this.life -= 1;
    }

    draw(){
        juego.ctx.drawImage(this.img, this.posicionX, this.posicionY, this.width, this.height);
    }

    drawLives(){
        juego.ctx.font = '50px serif';
        juego.ctx.fillStyle = '#ffffff';
        juego.ctx.textAlign = "left";
        juego.ctx.fillText(this.life, 90, 62);
    }

    animation(){        
        if (this.direction === 'left' && this.posicionX > 0){
            this.posicionX -= this.speed;
        }
        
        if (this.direction === 'right' && this.posicionX < (juego.canvas.width - this.width)){
            this.posicionX += this.speed;
        }

        if (this.direction === 'up' && this.posicionY > 0){
            this.posicionY -= this.speed;
        }

        if (this.direction === 'down' && this.posicionY < (juego.canvas.height - this.height)){
            this.posicionY += this.speed;
        }

        this.draw();
    }
}