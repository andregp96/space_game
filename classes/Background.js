class Background extends GameObject{
    
    InitialX = undefined;
    InitialY = undefined;    

    constructor(id,speed){
        super(id);
        this.Speed = speed;

        this.ScreenElement.classList.add("background");
        this.setImg("img/bg.png");
    }

    appendTo(parent,initial_x,initial_y){
        super.appendTo(parent);

        this.setX(initial_x);
        this.InitialX = this.x;

        this.setY(initial_y);
        this.InitialY = this.y;
    }

    moveUp(){
        if(this.y - this.Speed < 0){
            return false;
        }
        else{
            this.setY(this.y - this.Speed);
            return true;
        }
    }

    moveDown(){
        if(this.y + this.Speed > window.innerHeight){
            return false;
        }
        else{
            this.setY(this.y + this.Speed);
            return true;
        }
    }

    resetPosition(){
        this.setX(this.InitialX);
        this.setY(this.InitialY);
    }
}