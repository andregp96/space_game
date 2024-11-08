class Ship extends GameObject{

    constructor(id: string){
        super(id);
        this.ScreenElement.classList.add("ship");
        this.setImg("img/ship2.svg");
    }

    moveRight(){
        this.setX(this.x+ this.getWidth()/8);
    }

    moveLeft(){
        this.setX(this.x-this.getWidth()/8);
    }
}
