var keys = {};
var enemies = [];
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

function createEnemys(rows){
    bg = document.getElementById("background");
    let distance = 0;
    let height = 20
    for(let j = 0; j< rows; j++){
        for(let i=0;i<10;i++){
            var enemy = new GameObject("enemy"+i,"cat.svg",distance,height); 
            enemy.setPropertyValue("position","relative","");
            enemy.setPropertyValue("margin-left",2.5,"%");
            enemy.setPropertyValue("margin-right",2.5,"%");
            enemies.push(enemy);
        } 
        height += enemy.getPropertyValue("height") + 20;
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
    createEnemys(3);
    setInterval(() => {
      gameLoop();  
    }, 10);
}

