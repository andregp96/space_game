class GameObject{

    id;
    screen_element;
    state = "Alive";

    constructor(id,img_src,initial_x,initial_y){
        this.id = id;

        this.screen_element = document.createElement("div");
        this.screen_element.classList.add("game_object");

        let img = document.createElement("img");
        img.src = img_src;
        this.screen_element.append(img);

        this.setPropertyValue("left",initial_x,'px');
        this.setPropertyValue('top',initial_y,'px');
        
        document.getElementById("background").append(this.screen_element);
    }

    moveRight(){
        let left = this.getPropertyValue("left");
        let width =  this.getPropertyValue("width");
        let distance = width * 0.1;
        if(left + width + distance < window.innerWidth){
            this.setPropertyValue("left",left + distance,'px');
        }
    }

    moveLeft(){
        let left = this.getPropertyValue("left");
        let width =  this.getPropertyValue("width");
        let distance = width * 0.1;
        if(left > distance){
            this.setPropertyValue("left",left - distance,'px');
        }
    }

    getPropertyValue(property){
        let style_list = getComputedStyle(this.screen_element);
        return parseFloat(style_list[property]);
    }

    setPropertyValue(property,value,unity){
        this.screen_element.style[property] = value + unity;
    }

    checkCollision(enemy){
        if(
            enemy.getPropertyValue("top") <= this.getPropertyValue("top") + this.getPropertyValue("height") &&
            enemy.getPropertyValue("top") >= this.getPropertyValue("top") &&
            enemy.getPropertyValue("left") <= this.getPropertyValue("left") + this.getPropertyValue("width") &&
            enemy.getPropertyValue("left") >= this.getPropertyValue("left")
        ){
            return true;
        }
        else{
            return false;
        }
    }
}