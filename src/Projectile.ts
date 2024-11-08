class Projectile extends GameObject{

    constructor(id,type){
        super(id);
        this.ScreenElement.classList.add("projectile");
        this.Speed = 10;

        if(type == 0){
            this.setImg("img/player_projectile.png");
        }
        else{
            this.setImg("img/enemy_projectile.png");
        }
    }

    moveUp(){
        if(this.y - 10 < 0){
            this.State = "Dead";
        }
        else{
            this.setY(this.y-this.Speed);
        }
    }

    moveDown(){
        if(this.y + 10 > window.innerHeight){
            this.State = "Dead";
        }
        else{
            this.setY(this.y+this.Speed);
        }
        
    }
}
