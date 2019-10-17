class Enemy extends GameObject{

    constructor(id){
        super(id);
        this.ScreenElement.classList.add("enemy");
        this.Speed = 1
    }

    moveRight(){
        return this.setX(this.x+this.Speed);
    }

    moveLeft(){
        return this.setX(this.x-this.Speed);
    }
}
