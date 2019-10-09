class GameObject{

    screen_element = document.createElement("div");
    state = "Alive";
    img = document.createElement("img");
    x = 0;
    y = 0;

    constructor(id){
        this.screen_element.classList.add("game_object");
        this.screen_element.id = id;
    }

    setImg(src){
        this.img.src = src;
        this.screen_element.append(this.img);
    }

    setX(value){
        value= value.toString();
        if(value.search("%") == value.length - 1){
            this.setPctValue(value,"left");
        }
        else{ 
            this.setPxValue(value,"left");
        }
        this.x = this.getPxValue("left");   
    }

    setY(value){
        value= value.toString();
        if(value.search("%") == value.length - 1){
            this.setPctValue(value,"top");
        }
        else{
            this.setPxValue(value,"top");
        }
        this.y = this.getPxValue("top");
    }

    setPxValue(value,property){
        this.screen_element.style[property] = value+"px";
    }

    setPctValue(value,property){
        this.screen_element.style[property] = value;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getScreenElement(){
        return this.screen_element;
    }

    getPxValue(property){
        let style_list = getComputedStyle(this.screen_element);
        let value = parseFloat(style_list[property]);
        if(value == NaN){
            return false;
        }
        else{
            return value;
        }
    }

    moveRight(){
        if(this.x + 40 < window.innerWidth){
            this.setX(x+40);
        }
    }

    moveLeft(){
        if(this.x < window.innerWidth){
            this.setX(x-40);
        }
    }

    

    checkCollision(enemy){
        if(
            enemy.getPxValue("top") <= this.getPxValue("top") + this.getPxValue("height") &&
            enemy.getPxValue("top") >= this.getPxValue("top") &&
            enemy.getPxValue("left") <= this.getPxValue("left") + this.getPxValue("width") &&
            enemy.getPxValue("left") >= this.getPxValue("left")
        ){
            return true;
        }
        else{
            return false;
        }
    }
}