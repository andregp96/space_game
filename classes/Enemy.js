class Enemy extends GameObject{

    constructor(id){
        super(id);
        this.ScreenElement.classList.add("enemy");
        this.Speed = 1;
    }

    
    move(){
        if(!this.setX(this.x + this.Speed)){
            this.Speed = -this.Speed;
            this.setY(this.y + this.getHeight());
        }
    }
}
