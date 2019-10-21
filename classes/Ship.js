class Ship extends GameObject{

    constructor(id){
        super(id);
        this.ScreenElement.classList.add("ship");
        this.setImg("img/ship.svg");
    }

    moveRight(){
        this.setX(this.x+ this.getWidth()/8);
    }

    moveLeft(){
        this.setX(this.x-this.getWidth()/8);
    }
}
