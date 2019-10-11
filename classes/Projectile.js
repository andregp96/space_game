class Projectile extends GameObject{

    constructor(id){
        super(id);
        this.screen_element.classList.add("projectile");
    }

    moveUp(){
        if(this.y - 5 < 0){
            this.state = "Dead";
        }
        else{
            this.setY(this.y-5);
        }
    }

    moveDown(){
        if(this.y + 5 > window.innerHeight){
            this.state = "Dead";
        }
        else{
            this.setY(this.y+5);
        }
        
    }
}
