class Game{

    State = false;
    DifficultyLevel = 0;
    MainLoop = undefined;
    Engine = undefined;

    setKey(code,value){
       this.Engine.Keys[code] = value;
    }

    //TODO: migrar para o motor - Falta resize para os inimigos
    resizeGame(){
        this.Engine.resizeScreen();
    }

    gameLoop(){ //coisas que devem acontecer a cada iteração, sem exceções, como o movimento de projéteis e a captação de input do jogador
        this.Engine.update();
    }

    initializeGame(level){

        this.DifficultyLevel = level;
        this.Engine = new GameEngine(this.DifficultyLevel);
        this.startGame();
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
} 