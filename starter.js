var game;

function createGame(){
    game = new Game();
    game.startGame(20);
}

function redraw(){
    if(game != undefined){
        game.resizeGame();
    }
   
}

document.addEventListener('keydown',function(key){game.setKey(key.keyCode,true)});
document.addEventListener('keyup',function(key){game.setKey(key.keyCode,false)});
document.addEventListener("keypress",function(key){
    if(key.keyCode == 32){
        game.shoot();
    }
});
window.addEventListener("resize",function(){redraw()});

createGame();
