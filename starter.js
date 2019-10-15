var game;

function createGame(){
    game = new Game();
    game.initializeGame(46);
}

function redraw(){
    if(game != undefined){
        game.resizeGame();
    }
   
}

document.addEventListener('keydown',function(key){game.setKey(key.keyCode,true)});
document.addEventListener('keyup',function(key){game.setKey(key.keyCode,false)});
document.addEventListener("keypress",function(key){
    switch(key.keyCode){
        case 32:
            game.shoot();
        break;

        case 112:
            if(game.State){
                game.stopGame();
            }
            else{
                game.startGame();
            }
        break;

        
    }

});
window.addEventListener("resize",function(){redraw()});

createGame();
