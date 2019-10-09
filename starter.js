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
