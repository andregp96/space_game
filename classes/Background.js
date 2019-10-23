class Background{
    
    Panels = [];
    InitialX = undefined;
    InitialY = undefined;    

    constructor(speed,screen){
    
        this.Panels[0] = new GameObject("panel_1");
        this.Panels[0].ScreenElement.classList.add("background");
        this.Panels[0].setImg("img/bg.png");
        this.Panels[0].setSpeed(speed);

        this.Panels[0].appendTo(screen);

        this.Panels[1] = new GameObject("panel_2");
        this.Panels[1].ScreenElement.classList.add("background");
        this.Panels[1].setImg("img/bg.png");
        this.Panels[1].setSpeed(speed);

        this.Panels[1].appendTo(screen);

        this.resetPosition();
    }

    animate(){
        if(this.Panels[1].getY() + this.Panels[1].getSpeed() >= 0){
            this.resetPosition();
        }
        else{
            this.Panels[0].setY(this.Panels[0].getY() + this.Panels[0].getSpeed());
            this.Panels[1].setY(this.Panels[1].getY() + this.Panels[1].getSpeed());
        }
    }

    resetPosition(){
        this.Panels[0].setX(0);
        this.Panels[0].setY(0);

        this.Panels[1].setX(0);
        this.Panels[1].setY(-this.Panels[1].getHeight());
    }

}