const enemies = [];

class Enemie {
    constructor(x, y, speed, img, width, height, life, score){
        this.posicionX = x
        this.posicionY = y
        this.speed = speed
        this.img = img
        this.width = width
        this.height = height
        this.life = life
        this.score = score
    }

    draw(){
        //console.log('draw');
        juego.ctx.drawImage(this.img, this.posicionX, this.posicionY, this.width, this.height);
    }

    spawnEnemies(){
        //console.log('spawnEnemies');
    }

    shootsEnemies(){
        //console.log('shootsEnemies');
        enemies.forEach(enem => {
            projectilesEnemies.push(new Projectile(
                enem.posicionX + (enem.width / 2) + 2, 
                enem.posicionY + (enem.height / 2), 
                4, 
                50, 
                10, 
                juego.imgProjectileTie
            ));
        });
        setTimeout(() => { this.shootsEnemies() }, Math.random() * (1500 - 200) + 200);
    }

    hit(){
        this.life -= 1;
    }

    animation(){
        //console.log(enemies);
        this.draw();
        this.posicionY += this.speed;      
    }

    delete(arr, val){
        setTimeout(() => {
            const ind = arr.indexOf(val);
            arr.splice( ind, 1 );
        }, 0);
    }
}