var keys = {};

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

    screen_element;

    constructor(elemento){
        this.screen_element = elemento;
    }

    moveRight(){
        let style = getComputedStyle(this.screen_element);
        let left = this.styleToNumber(style.left);
        if(left < window.outerWidth - 110){
            this.screen_element.style.left = this.styleToString(left+40);
        }
    }

    moveLeft(){
        let style = getComputedStyle(this.screen_element);
        let left = this.styleToNumber(style.left);
        if(left > 35){
            this.screen_element.style.left = this.styleToString(left-40);
        }
    }

    styleToNumber(value){
        return parseInt(value,10);
    }

    styleToString(value){
        return value + 'px';
    }
}

var ship = new GameObject(document.getElementById("ship"));

function gameLoop(){
    for(let index in keys){
        if(keys[index]){
            moveShip(index);
        }
    }
}

setInterval(() => {
  gameLoop();  
}, 10);