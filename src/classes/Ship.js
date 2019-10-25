class Ship extends GameObject{

    constructor(id){
        super(id);
        this.ScreenElement.classList.add("ship");
        this.setImg("img/ship2.svg");
        this.Speed = 10;
    }

    moveRight(){
        // this.setX(this.x+ this.getWidth()/10);
        this.setX(this.x+ this.Speed);
    }

    moveLeft(){
        // this.setX(this.x-this.getWidth()/10);
        this.setX(this.x- this.Speed);
    }
    
    die(){

    }

}