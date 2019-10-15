class Enemy extends GameObject{

    constructor(id){
        super(id);
        this.ScreenElement.classList.add("enemy");
    }

    moveRight(){
        return this.setX(this.x+10);
    }

    moveLeft(){
        return this.setX(this.x-10);
    }
}
