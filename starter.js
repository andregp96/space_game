var game;

function createGame(){
    game = new Game();
    game.startGame(20);
}

function redraw(){
    if(game != undefined){
        game.refreshGame();
    }
   
}

document.addEventListener('keydown',function(key){game.setKey(key.keyCode,true)});
document.addEventListener('keyup',function(key){game.setKey(key.keyCode,false)});
window.addEventListener("resize",function(){redraw()});

createGame();
