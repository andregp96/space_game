class Ship extends GameObject{

    constructor(id){
        super(id);
        this.screen_element.classList.add("ship");
    }

    moveRight(){
        this.setX(this.x+10);
    }

    moveLeft(){
        this.setX(this.x-10);
    }
}
