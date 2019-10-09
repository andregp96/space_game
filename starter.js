var game;

function createGame(){
    game = new Game();
    game.startGame(2);
}

function redraw(){
    if(game != undefined){
        game.draw();
    }
   
}

document.addEventListener('keydown',function(key){game.setKey(key.keyCode,true)});
document.addEventListener('keyup',function(key){game.setKey(key.keyCode,false)});
document.getElementById("corpo").addEventListener("resize",redraw());
createGame();
