class Canvas{
    constructor(img){
        this._img = img
    }

    set img(i){
        this._img = i;
    }

    get img(){
        return this._img;
    }

    preloadImages(){
        //console.log(this.img);
    }

    drawBackground(){
        juego.ctx.drawImage(this.img, 0, 0, 650, 950);
    }

    drawLogo(){
        juego.ctx.drawImage(this.img, 20, 20, 50, 50);
    }

    clearCanvas(){
        juego.ctx.clearRect(0, 0, juego.ctx.width, juego.ctx.height);
    }
    
}