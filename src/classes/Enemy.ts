class Enemy extends GameObject{

    Firerate =  undefined;

    constructor(id,firerate){
        super(id);
        this.ScreenElement.classList.add("enemy");
        this.Speed = 1;
        this.setImg("img/cat.png")
        this.Firerate = firerate;
    }

    
    move(){
        if(!this.setX(this.x + this.Speed)){
            this.Speed = -this.Speed;
            this.setY(this.y + this.getHeight());
        }
    }

    fire(player){
        if(Math.random() >= this.Firerate || (this.checkAllignement(player) && Math.random() >= this.Firerate)){
            return true;
        }
        else{
            return false;
        }
    }

    update(player){
        this.move();
        return this.fire(player);
    }
}
