class GameObject{

    ScreenElement: HTMLElement = document.createElement("div");
    State: string = "Alive";
    Appended: boolean = false;
    Img:HTMLImageElement = document.createElement("img");
    Speed: number = undefined;
    x:number = 0;
    y:number = 0;

    constructor(id: string){
        this.ScreenElement.classList.add("game_object");
        this.ScreenElement.id = id;
    }

    getState(){
        return this.State;
    }

    appendTo(parent:HTMLElement){
        parent.append(this.ScreenElement);
        this.Appended = true;

        this.setY(this.getAbsoluteY());
        this.setX(this.getAbsoluteX());
    }

    setImg(src:string){
        this.Img.src = src;
        this.ScreenElement.append(this.Img);
    }

    setX(value:number | string){
        if(this.Appended == true && typeof value == "number" ){
            if(this.getWidth() + value > window.innerWidth || value < 0){
                return false;
            }
        }     
        
        let css_value = value.toString();
        if(css_value.search("%") == css_value.length - 1){
            this.setPctValue(css_value,"left");
        }
        else{ 
            this.setPXValue(css_value,"left");
        }

        this.x = this.getAbsoluteX();
        return true;
    }

    setY(value: number | string){
        let css_value = value.toString();

        if(css_value.search("%") == css_value.length - 1){
            this.setPctValue(css_value,"top");
        }
        else{
            this.setPXValue(css_value,"top");
        }
        if(this.Appended == true){
            this.y = this.getAbsoluteY();
        }

        return true;
    }

    setPXValue(value: string, property: "top" | "left"){
        this.ScreenElement.style[property] = value+"px";

    }

    setPctValue(value:string, property: "top" | "left"){
        this.ScreenElement.style[property] = value;
    }

    setSpeed(value: number){
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

    checkCollision(projectile: GameObject){
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

    checkAllignement(obj: GameObject){
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