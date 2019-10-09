class Game{

    Screen = document.getElementById("screen");
    Player;
    Enemies = [];
    Keys = {};

    setKey(code,value){
        this.Keys[code] = value;
    }

    addToScreen(obj){
        this.Screen.append(obj);
    }

    removeFromScreen(obj){
        this.Screen.remove(obj.getId);
    }

    drawGame(){
        this.addToScreen(this.Player.getScreenElement());
        for(let i=0;i<this.Enemies.length;i++){
            this.addToScreen(this.Enemies[i].getScreenElement());
        }
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

    startGame(rows){
        this.createPlayer();
        this.Player.setX("45%");
        this.Player.setY("90%");
        this.createEnemies(rows);
        this.drawGame();
        
        
        setInterval(() => {
          this.gameLoop();  
        }, 10);
    }

    stopGame(){

    }

    createPlayer(){
        this.Player = new GameObject("player");
        this.Player.setImg("ship.svg");
    }

    createEnemies(rows){
        let x = 2.5;
        let y = 5;
        let enemy;

        for(let i = 0; i< rows; i++){
            x = 2.5;
            for(let j=0;j<10;j++){
                enemy = new GameObject("enemy"+j);
                enemy.setImg("cat.svg");
                enemy.setX(x + "%");
                enemy.setY(y+ "%"); 
                this.Enemies.push(enemy);  
                x += 10;
            } 
            y += 15;      
        }    
    }

} 