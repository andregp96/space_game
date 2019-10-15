class Enemy extends GameObject{

    constructor(id){
        super(id);
        this.ScreenElement.classList.add("enemy");
    }

    moveRight(){
        return this.setX(this.x+2);
    }

    moveLeft(){
        return this.setX(this.x-2);
    }
}
