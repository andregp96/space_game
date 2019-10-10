class GameObject{

    screen_element = document.createElement("div");
    state = "Alive";
    appended = false;
    img = document.createElement("img");
    x = 0;
    y = 0;

    constructor(id){
        this.screen_element.classList.add("game_object");
        this.screen_element.id = id;
    }

    getState(){
        return this.state;
    }

    appendTo(parent){
        parent.append(this.screen_element);
        this.appended = true;

        this.setY(this.getPxValue("top"));
        this.setX(this.getPxValue("left"));
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
        if(this.appended == true){
            this.x = this.getPxValue("left");   

            if(this.x + this.getPxValue("width") > window.innerWidth){
                this.setX(window.innerWidth - this.getPxValue("width"));
            }
            if(this.x < 0){
                this.setX(0);
            }
        }      
    }

    setY(value){
        value= value.toString();
        if(value.search("%") == value.length - 1){
            this.setPctValue(value,"top");
        }
        else{
            this.setPxValue(value,"top");
        }
        if(this.appended == true){
            this.y = this.getPxValue("top");
        }
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
            throw "Valor não numérico retornado para propriedade" + property;
        }
        else{
            return value;
        }
    }

    moveRight(){
        this.setX(this.x+20);
    }

    moveLeft(){
        this.setX(this.x-20);
    }

    checkCollision(enemy){
        if(
            (enemy.getY() >= this.y && enemy.getY() <= this.y + this.getPxValue("height")) &&
            (enemy.getX() >= this.x && enemy.getX() <= this.x + this.getPxValue("width"))
        ){
            return true;
        }
        else{
            return false;
        }
    }

    destroy(){
        this.screen_element.remove();
        delete this.screen_element;
        delete this;
    }
}