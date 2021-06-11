class Score{
    constructor(puntos, img, posicion = 1){
        this._puntos = puntos
        this._img = img
        this._posicion = posicion
    }

    set img(i){
        this._img = i;
    }

    get img(){
        return this._img;
    }

    set puntos(val){
        this._puntos += val;
    }

    get puntos(){
        return this._puntos;
    }

    set posicion(val){
        this._posicion = val;
    }

    get posicion(){
        return this._posicion;
    }

    drawScore(){
        juego.ctx.font = '50px serif';
        juego.ctx.fillStyle = '#ffffff';
        juego.ctx.textAlign = "right";
        juego.ctx.fillText(this.puntos, 620, 60);
    }

    drawGameOver(){
        juego.ctx.drawImage(this.img, 80, 250, 500, 450);
        juego.ctx.globalCompositeOperation='destination-over';
    }

    showStorage(){
        this.saveStorage();
        let totalScores = this.getStorage();
        console.log(totalScores);
    }

    saveStorage(){
        localStorage.setItem(new Date().getTime(), this.puntos)
    }

    getStorage(){
        let allScores = [];
        if(localStorage.length === 0){return allScores;}

        for (let i=0; i < localStorage.length; i++) {
            allScores[i] = localStorage.getItem(localStorage.key(i));
        }

        return allScores.sort((a, b) => {
            // Si a es menor que b por el criterio que nosotros elegimos, devolvemos -1
            if (a.length > b.length) {
              return -1;
            } else if (a.length < b.length) {
              return 1;
            }
            return 0;
        });
    }
    
}