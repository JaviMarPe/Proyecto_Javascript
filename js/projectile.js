const projectilesPlayer = [];
const projectilesEnemies = [];

class Projectile {
    constructor(x, y, w, h, speed, img){
        this.posicionX = x
        this.posicionY = y
        this.width = w
        this.height = h
        this.speed = speed
        this.img = img
    }

    draw(){
        juego.ctx.drawImage(this.img, this.posicionX, this.posicionY, 4, 50);
    }

    animPlayer(){
        this.draw();
        this.posicionY -= this.speed;
        return this.posicionY;
    }

    animEnem(){
        this.draw();
        this.posicionY += this.speed;
        return this.posicionY;
    }

    delete(arr, val){
        setTimeout(() => {
            const ind = arr.indexOf(val);
            arr.splice( ind, 1 );
        }, 0);
    }
}