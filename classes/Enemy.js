class Enemy extends GameObject{

    constructor(id){
        super(id);
        this.screen_element.classList.add("enemy");
    }

    moveRight(){
        this.setX(this.x+20);
    }

    moveLeft(){
        this.setX(this.x-20);
    }
}
