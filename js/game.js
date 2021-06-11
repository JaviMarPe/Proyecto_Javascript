const juego = {
  canvas: null,
  ctx: null,
  imagenes: {
    'imgBackground' : 'assets/Fondo_01.jpg',
    'gameOver' : 'assetsPixelados/gameover.jpeg',
    'logo' : 'assetsPixelados/logo.png',
    'imgPlayer' : 'assetsPixelados/Nave_02.png',
    'imgProjectilePlayer' : 'assets/DisparoRojo.png',
    'imgProjectileTie' : 'assets/DisparoVerde.png',
    'imgProjectileImperial' : 'assets/DisparoAzul.png',
    'naveTieFighter' : 'assets/Enemigo_02.png',
    'naveImperial' : 'assets/Enemigo_01.png',
    'naveDeathStar' : 'assets/Boss_01.png',
  },
  primeraOleada: true,
  segundaOleada: false,
  animationId: ''
};

const canvasClass = new Canvas(juego.imagenes);
const scoreClass = new Score(0);
const enemieClass = new Enemie();
const projectileClass = new Projectile();
const playerClass = new Player(240, 700, 120, 150, 10, 3);

juego.init = function() {
    //precargamos todas las imagenes
    this.preloadImages();

    //renderizamos el canvas
    this.canvas = document.getElementById('space');
    this.ctx = this.canvas.getContext('2d');
    
    playerClass.img = juego.imgPlayer;
    scoreClass.img = juego.logo;

    /* Activamos un setInterval para la aparicion de los enemigos*/
    this.primeraInterval = setInterval(() => {
      const w = 100;
      const h = 120;
      const x = Math.random() * (juego.canvas.width-w);
      const y = -h;
      const s = 2;
      const n = juego.naveTieFighter;
      const puntuacion = 100;
      enemies.push(new Enemie(x, y, s, n, w, h, 2, puntuacion));
    }, Math.random() * (2000 - 1000) + 1000);

    /* Activamos un setTimeout para los disparos de los enemigos*/
    enemieClass.shootsEnemies();
    
    this.updateGame();
};

juego.preloadImages = function() {
    this.imgBackground = new Image();
    this.imgBackground.src = 'assets/Fondo_01.jpg';
    this.gameOver = new Image();
    this.gameOver.src = 'assetsPixelados/gameover.jpeg';
    this.logo = new Image();
    this.logo.src = 'assetsPixelados/logo.png';
    this.imgPlayer = new Image();
    this.imgPlayer.src = 'assetsPixelados/Nave_02.png';
    this.imgProjectilePlayer = new Image();
    this.imgProjectilePlayer.src = 'assetsPixelados/DisparoRojo.png';
    this.imgProjectileTie = new Image();
    this.imgProjectileTie.src = 'assetsPixelados/DisparoVerde.png';
    this.naveTieFighter = new Image();
    this.naveTieFighter.src = 'assetsPixelados/Enemigo_02.png';
    this.naveImperial = new Image();
    this.naveImperial.src = 'assetsPixelados/Enemigo_01.png';
};

juego.updateGame = function() {
    const animaId = requestAnimationFrame(juego.updateGame);
    //limpiamos el canvas para volver a renderizar todos los elementos en las posiciones adecuadas
    canvasClass.clearCanvas();

    //renderizamos la imagen de fondo
    canvasClass.img = juego.imgBackground;
    canvasClass.drawBackground();

    //logo
    canvasClass.img = juego.logo;
    canvasClass.drawLogo();

    //vidas del jugador
    playerClass.drawLives();

    //puntuacion del jugador
    scoreClass.drawScore();

    //Comprobamos cuantas vidas tiene el jugador y sino terminamos el juego
    if(playerClass.life <= 0){
      console.log('he muerto');      
      cancelAnimationFrame(animaId);
      scoreClass.showStorage();
      scoreClass.img = juego.gameOver;
      scoreClass.drawGameOver();
    }
    
    //renderizamos el player y manejamos su movimiento
    playerClass.animation();

    //cargamos los proyectiles del player
    projectilesPlayer.forEach(proj => {
      const posProj = proj.animPlayer();
      //borramos el projectil si sale del canvas
      if(posProj < 0){
        proj.delete(projectilesPlayer, proj);
      }
    });

    //cargamos los proyectiles del enemigo
    projectilesEnemies.forEach(proj => {
      const posProj = proj.animEnem();
      //borramos el projectil si sale del canvas
      if(posProj >= juego.canvas.height){
        proj.delete(projectilesEnemies, proj);
      }
      //comprobamos si el proyectil colisiona con el player
      if((playerClass.posicionY + 30) - (proj.posicionY + proj.height) < 0 &&
        (playerClass.height + (playerClass.posicionY + 30)) > proj.posicionY &&
        (proj.posicionX + proj.width) >= playerClass.posicionX && 
        proj.posicionX <= (playerClass.posicionX + playerClass.width)
        ){
          //borramos el proyectil
          proj.delete(projectilesEnemies, proj);
          //golpeamos al player
          playerClass.hit();
      }
    });

    //cargamos los enemigos
    enemies.forEach(enem => {
      //movimiento de las naves enemigas
      enem.animation();

      //borramos las naves que ya han pasado la linea final del canvas
      if(enem.posicionY > juego.canvas.height){
        enem.delete(enemies, enem);
      }

      //vamos a detectar la colision de la nave enemiga con el player
      const distanciaPLayEnem = playerClass.posicionY - (enem.height + enem.posicionY);
      if(distanciaPLayEnem < 0 && 
        enem.posicionY <= (playerClass.height + playerClass.posicionY) && 
        (playerClass.posicionX + playerClass.width) >= enem.posicionX && 
        playerClass.posicionX <= (enem.posicionX + enem.width)
        ){
          //borramos el enemigo
          enem.delete(enemies, enem);
          //añadimos la puntuacion
          scoreClass.puntos = enem.score;
          //el jugador es golpeado
          playerClass.hit();          
      }
      //vamos a detectar la colision del proyectil con la nave enemiga
      projectilesPlayer.forEach(proj => {
          const distanciaProjEnem = proj.posicionY - (enem.height + enem.posicionY);
          //calculamos la colision y removemos el enemigo y el disparo
          if(distanciaProjEnem < 0 && 
            enem.posicionY <= (proj.height + proj.posicionY) && // para que la nave enemiga este mas arriba que el disparo
            (proj.posicionX + proj.width) >= enem.posicionX && 
            proj.posicionX <= (enem.posicionX + enem.width)
            ){
              //borramos el proyectil
              proj.delete(projectilesPlayer, proj);
              //golpeamos a la nave enemiga
              enem.hit();
              //comprobamos la vida que tiene y lo borramos
              if(enem.life === 0){
                enem.delete(enemies, enem);
                //añadimos la puntuacion
                scoreClass.puntos = enem.score;
              }
          }
      });
    });
}


addEventListener('keydown', function(e) {
    switch (e.code) {
        case "Down": // IE specific value
        case "ArrowDown":
          playerClass.direction = 'down';
          break;
        case "Up": // IE specific value
        case "ArrowUp":
          playerClass.direction = 'up';
          break;
        case "Left": // IE specific value
        case "ArrowLeft":
          playerClass.direction = 'left';
          break;
        case "Right": // IE specific value
        case "ArrowRight":
          playerClass.direction = 'right';
          break;
        case "Enter":
          break;
        case "Space":
          const widthProjPlayer = 4;
          const heightProjPlayer = 50;
          const speedProjPlayer = 20;
          projectilesPlayer.push(new Projectile(playerClass.posicionX, playerClass.posicionY, widthProjPlayer, heightProjPlayer, speedProjPlayer, juego.imgProjectilePlayer));
          projectilesPlayer.push(new Projectile(playerClass.posicionX + (playerClass.width - 5), playerClass.posicionY, widthProjPlayer, heightProjPlayer, speedProjPlayer, juego.imgProjectilePlayer));
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
});

addEventListener('keyup', function(e) {
    playerClass.direction = '';
});

window.addEventListener('load', function(event) {
    juego.init();
});