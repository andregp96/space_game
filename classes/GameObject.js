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
        value= value.toString();
        if(value.search("%") == value.length - 1){
            this.setPctValue(value,"left");
        }
        else{ 
            this.setPXValue(value,"left");
        }

        if(this.Appended == true){
            this.x = this.getAbsoluteX();   

            if(this.x + this.getWidth() > window.innerWidth){
                this.setPXValue(window.innerWidth - this.getWidth(),"left");
                return true;
            }
            if(this.x < 0){
                this.setPXValue(0,"left");
                return false;
            }
        }      
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
    }

    setPXValue(value,property){
        this.ScreenElement.style[property] = value+"pX";
    }

    setPctValue(value,property){
        this.ScreenElement.style[property] = value;
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

    destroy(){
        this.ScreenElement.remove();
        this.ScreenElement = undefined;
    }
}