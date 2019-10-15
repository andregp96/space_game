class Projectile extends GameObject{

    constructor(id,type){
        super(id);
        this.ScreenElement.classList.add("projectile");

        if(type == 0){
            this.setImg("player_projectile.svg");
        }
        else{
            this.setImg("enemy_projectile.svg");
        }
    }

    moveUp(){
        if(this.y - 10 < 0){
            this.State = "Dead";
        }
        else{
            this.setY(this.y-10);
        }
    }

    moveDown(){
        if(this.y + 10 > window.innerHeight){
            this.State = "Dead";
        }
        else{
            this.setY(this.y+10);
        }
        
    }
}
