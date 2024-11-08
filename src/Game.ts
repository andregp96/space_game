class Game{

    State: boolean = false;
    DifficultyLevel: number = 0;
    MainLoop:number = undefined;
    Engine:GameEngine = undefined;

    InGameScreens:{Win:string, Lose:string, Menu:string} = {
        Win : undefined,
        Lose : undefined,
        Menu : undefined
    }

    constructor(menu_screen:string ,lose_screen:string ,win_screen:string){
        this.InGameScreens.Menu = menu_screen;
        this.InGameScreens.Lose = lose_screen;
        this.InGameScreens.Win = win_screen;    

        this.hideScreen(this.InGameScreens.Menu);
        this.hideScreen(this.InGameScreens.Lose);
        this.hideScreen(this.InGameScreens.Win);
    }
    
    showScreen(screen: string){
        document.getElementById(screen).style.display = "block";
        document.getElementById(screen).focus();
    }

    hideScreen(screen: string){
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
        }
    }

    initializeGame(level: number){
        this.DifficultyLevel = level;
        this.Engine = new GameEngine(this.DifficultyLevel);
        this.startGame();
    }

    endGame(main_screen:string){
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

    stopGame(){
        clearInterval(this.MainLoop);
        this.State = false;
    }

    startGame(){
        this.MainLoop = setInterval(() => {this.gameLoop()}, 20);
        this.State = true;
    }

    shoot(){
        this.Engine.shoot();
    }

    gameInput(key:number, state: boolean){
        this.Engine.setKey(key,state);
    }

    screenInput(key:number){
        switch(key){
            case 32:
                this.Engine.shoot();
            break;
        
            case 112:
                if(this.State){
                    this.stopGame();
                    this.showScreen(this.InGameScreens.Menu);
                }
                else{
                    this.startGame();
                    this.hideScreen(this.InGameScreens.Menu);
                }
            break;
        }
    }
} 