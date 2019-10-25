class Game{

    State = false;
    DifficultyLevel = 0;
    MainLoop = undefined;
    Engine = undefined;

    InGameScreens = {
        Win : undefined,
        Lose : undefined,
        Menu : undefined
    }

    constructor(menu_screen,lose_screen,win_screen){
        this.InGameScreens.Menu = menu_screen;
        this.InGameScreens.Lose = lose_screen;
        this.InGameScreens.Win = win_screen;    

        this.hideScreen(this.InGameScreens.Menu);
        this.hideScreen(this.InGameScreens.Lose);
        this.hideScreen(this.InGameScreens.Win);
    }
    
    showScreen(screen){
        document.getElementById(screen).style.display = "block";
        document.getElementById(screen).focus();
    }

    hideScreen(screen){
        document.getElementById(screen).style.display = "none";
    }

    //TODO: migrar para o motor - Falta resize para os inimigos
    resizeGame(){
        this.Engine.resizeScreen();
    }

    gameLoop(){ 
        switch(this.Engine.update()){
            case 1:
                clearInterval(this.MainLoop);
                this.showScreen(this.InGameScreens.Lose);
            break;

            case 2:
                clearInterval(this.MainLoop);
                this.showScreen(this.InGameScreens.Win);
            break;
        
            default:
                this.MainLoop = requestAnimationFrame(this.gameLoop.bind(this));
            break;
        }
        
    }

    initializeGame(level){
        this.DifficultyLevel = level;
        this.Engine = new GameEngine(this.DifficultyLevel);
        this.startGame();
    }

    endGame(main_screen){
        this.Engine.destroy();
        this.Engine = undefined;
        
        if(main_screen != undefined){
            this.showScreen(main_screen);
        }     
    }

    resetGame(){
        this.endGame(undefined);
        this.initializeGame(this.DifficultyLevel);
    }

    stopGame(screen){
        cancelAnimationFrame(this.MainLoop);
        this.State = false;
        if(screen != undefined){
            this.showScreen(this.InGameScreens.Menu);
        }
    }

    startGame(screen){
        this.MainLoop = requestAnimationFrame(this.gameLoop.bind(this));
        this.State = true;
        if(screen != undefined){
            this.hideScreen(this.InGameScreens.Menu);
        }
    }

    shoot(){
        this.Engine.shoot();
    }

    gameInput(key,state){
        this.Engine.setKey(key,state);
    }

    screenInput(key){
        switch(key){
            case 32:
                this.Engine.shoot();
            break;
        
            case 112:
                if(this.State){
                    this.stopGame(true);
                    
                }
                else{
                    this.startGame(true);  
                }
            break;
        }
    }
} 