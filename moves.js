var keys = {};
var ship;

function moveShip(key){
    code = key;
    
    switch(code){
        case "39":
            ship.moveRight();
        break;
    
        case "37":
            ship.moveLeft();
        break;
    }
}

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
        let width = this.getPropertyValue("right");
        if(left < window.innerWidth - width){
            this.setPropertyValue("left",left + 40,'px');
        }
    }

    moveLeft(){
        let left = this.getPropertyValue("left");
        if(left > 35){
            this.setPropertyValue("left",left - 40,'px');
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

function createEnemys(num){
    bg = document.getElementById("background");
    for(let i=0;i<num;i++){
        let enemy = new GameObject("enemy"+i,"ship.svg",i*80,10); 
    }
}

function createPlayer(){
    ship = new GameObject("player","ship.svg",0,0);
    ship.setPropertyValue('bottom',10,'px');
    ship.setPropertyValue('left',45,"%");
    ship.setPropertyValue('top','',"");
    return ship;
}

function gameLoop(){
    for(let index in keys){
        if(keys[index]){
            moveShip(index);
        }
    }
}

function start_game(){
    ship = createPlayer();
    createEnemys(10);
    setInterval(() => {
      gameLoop();  
    }, 10);
}

