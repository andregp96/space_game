class Game{

    Screen = document.getElementById("screen");
    Player;
    Enemies = [];
    Keys = {};
    MainLoop;

    setKey(code,value){
        this.Keys[code] = value;
    }

    removeFromScreen(obj){
        this.Screen.remove(obj.getId);
    }

    drawGame(){
        this.Player.appendTo(this.Screen);
        for(let i=0;i<this.Enemies.length;i++){
            this.Enemies[i].appendTo(this.Screen);
        }
    }

    refreshGame(){
        this.Player.setX(this.Player.getX());
        this.Player.setY("90%");
        
        this.startEnemies()
    }

    processInput(key){
        switch(key){
            case "39":
                this.Player.moveRight();
            break;
        
            case "37":
                this.Player.moveLeft();
            break;
        }
    }

    gameLoop(){
        for(let index in this.Keys){
            if(this.Keys[index]){
                this.processInput(index);
            }
        }
    }

    startGame(enemies){

        this.Player = this.createGameObject("player","ship.svg");
        this.startPlayer();

        for(let i=0;i<enemies;i++){
            let enemy = this.createGameObject("enemy_"+i,"cat.svg");
            this.Enemies.push(enemy);  
        }
        this.startEnemies();
        
        this.drawGame();   
        
        this.MainLoop = setInterval(() => {this.gameLoop();}, 10);
    }

    stopGame(){
        clearInterval(this.MainLoop);
    }

    createGameObject(id,src){
        let obj = new GameObject(id);
        obj.setImg(src);

        return obj;
    }

    startEnemies(){
        let y = 5;
        let x = 2.5;
        for(let i = 0;i < this.Enemies.length;i++){
            if(this.Enemies[i].getState() == "Alive"){
                this.Enemies[i].setX(x + "%");
                this.Enemies[i].setY(y + "%");
                if(x > 90){
                    x = 2.5;
                    y += 15;
                }
                else{
                    x += 10;  
                }
            }      
        }  
    }

    startPlayer(){
        this.Player.setX("45%");
        this.Player.setY("90%");
    }

} 