var game = undefined;

function iniciaJogo(dificuldade) {
    game = new Game("in_game_menu","in_game_lose","in_game_win");

    window.addEventListener("resize",function(){game.redraw()});

    document.getElementById('main_screen').style.display = "none";
    document.getElementById('screen').style.display = "block";
    
    game.initializeGame(dificuldade);

    document.addEventListener('keypress',function(key){game.screenInput(key.keyCode)});

    document.addEventListener('keydown',function(key){game.gameInput(key.keyCode,true)});
    document.addEventListener('keyup',function(key){game.gameInput(key.keyCode,false)});
    
}

