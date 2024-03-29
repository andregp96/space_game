class GameObject{

    ScreenElement = document.createElement("div");
    State = "Alive";
    Appended = false;
    Img = document.createElement("img");
    Speed = undefined;
    x = 0;
    y = 0;

    constructor(id){
        this.ScreenElement.classList.add("game_object");
        this.ScreenElement.id = id;
    }

    getState(){
        return this.State;
    }

    appendTo(parent){
        parent.append(this.ScreenElement);
        this.Appended = true;

        this.setY(this.getAbsoluteY());
        this.setX(this.getAbsoluteX());
    }

    setImg(src){
        this.Img.src = src;
        this.ScreenElement.append(this.Img);
    }

    setX(value){
    
        if(this.Appended == true){
            if(this.getWidth() + value > window.innerWidth || value < 0){
                return false;
            }
        }     
        
        value= value.toString();
        if(value.search("%") == value.length - 1){
            this.setPctValue(value,"left");
        }
        else{ 
            this.setPXValue(value,"left");
        }

        this.x = this.getAbsoluteX();
        return true;
    }

    setY(value){
        value= value.toString();
        if(value.search("%") == value.length - 1){
            this.setPctValue(value,"top");
        }
        else{
            this.setPXValue(value,"top");
        }
        if(this.Appended == true){
            this.y = this.getAbsoluteY();
        }

        return true;
    }

    setPXValue(value,property){
        this.ScreenElement.style[property] = value+"px";
    }

    setPctValue(value,property){
        this.ScreenElement.style[property] = value;
    }

    setSpeed(value){
        this.Speed = value;
    }

    getX(){
        return this.x;
    }

    getAbsoluteX(){
        let style_list = getComputedStyle(this.ScreenElement);
        return parseFloat(style_list["left"]);
    }

    getY(){
        return this.y;
    }

    getAbsoluteY(){
        let style_list = getComputedStyle(this.ScreenElement);
        return parseFloat(style_list["top"]);
    }

    getWidth(){
        let style_list = getComputedStyle(this.ScreenElement);
        return parseFloat(style_list["width"]);
    }

    getHeight(){
        let style_list = getComputedStyle(this.ScreenElement);
        return parseFloat(style_list["height"]);
    }

    getSpeed(){
        return this.Speed;
    }

    checkCollision(projectile){
        if(
            (projectile.getY() >= this.y && projectile.getY() <= this.y + this.getHeight()) &&
            (projectile.getX() >= this.x && projectile.getX() <= this.x + this.getWidth())
        ){
            return true;
        }
        else{
            return false;
        }
    }

    checkAllignement(obj){
        if(obj.getX() >= this.x && obj.getX() <= this.x + this.getWidth()){
            return true;
        }
        else{
            return false;
        }
    }

    // moveRight(){
    //     return this.setX(this.x+this.Speed);
    // }

    // moveLeft(){
    //     return this.setX(this.x-this.Speed);
    // }

    // moveUp(){
    //     return this.setY(this.y-this.Speed);
    // }

    // moveDown(){
    //     return this.setY(this.y+this.Speed);
    // }

    destroy(){
        if(this.ScreenElement != undefined){
            this.ScreenElement.remove();
            this.ScreenElement = undefined;
        }
        
    }
}