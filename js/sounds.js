class Sound {
    constructor(element){
        this._element = element
    }

    set element(e){
        this._element = e;
    }

    get element(){
        return this._element;
    }

    init(){
        
    }

    play(){
        this.element.play();
    }

    stop(){
        this.element.pause();
    }
}