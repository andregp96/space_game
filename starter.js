var game = undefined;

function redraw(){
    if(game != undefined){
        game.resizeGame();
    }
}

function iniciaJogo(dificuldade) {
    game = new Game();
    document.getElementById('menu').style.display = "none";
    document.getElementById('screen').style.display = "block";
    game.initializeGame(dificuldade);

    document.addEventListener('keydown',function(key){game.setKey(key.keyCode,true)});
    document.addEventListener('keyup',function(key){game.setKey(key.keyCode,false)});
   
    document.addEventListener("keypress",function(key){
    if(game == undefined){
        return false;
    }
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
}

