class Game{

    Screen = document.getElementById("screen");
    State = false;
    Engine = new GameEngine();
    ScreenObjects = {
        "Player": undefined,
        "Enemies": [],
        "PlayerProjectiles": [],
        "EnemyProjectiles": []
    };
    Config = {
        "DifficultyLevel": 0,
        "ShootFrequency": [0.999,0.997,0.995]
    }
    
    MainLoop = undefined;
    SecondaryLoop = undefined;


    setKey(code,value){
       this.Engine.Keys[code] = value;
    }

    createProjectile(obj,type){
        let proj = new Projectile("projectile",type);
        proj.setX(-1 + obj.getX() + obj.getWidth()/2);
        proj.setY(obj.getY()- obj.getHeight()); 

        return proj;
    }

    createGameObject(id,src){
        let obj = new GameObject(id);

        obj.setImg(src);

        return obj;
    }

    drawGame(){
        this.ScreenObjects.Player.appendTo(this.Screen);
        for(let i=0;i<this.ScreenObjects.Enemies.length;i++){
            this.ScreenObjects.Enemies[i].appendTo(this.Screen);
        }
    }

    positionEnemies(){
        let x = 4;
        let y = 2;
        
        for(let i = 0;i < this.ScreenObjects.Enemies.length;i++){

            this.ScreenObjects.Enemies[i].setX(x + "%");
            this.ScreenObjects.Enemies[i].setY(y + "%");
            if(x > 90){
                x = 4;
                y += 8;
            }
            else{
                x += 4;  
            }     
        }  
    }

    resizeGame(){
        this.ScreenObjects.Player.setX(this.Player.getX());
        this.ScreenObjects.Player.setY("90%");
        
        this.positionEnemies();
    }

    processMovement(){


        if(Math.random() > 0.5){
            for(let index in this.ScreenObjects.Enemies){

                let en = this.ScreenObjects.Enemies[index]; 
                en.moveLeft();
    
            } 
        }
        else{
            for(let index in this.ScreenObjects.Enemies){

                let en = this.ScreenObjects.Enemies[index]; 
                en.moveRight();
            } 
        }
         
    }

    processActions(){
        for(let index in this.ScreenObjects.Enemies){

            let en = this.ScreenObjects.Enemies[index];

            if(Math.random() >= this.Config.ShootFrequency[this.Config.DifficultyLevel]){
                let proj = this.createProjectile(en,1);
                proj.appendTo(this.Screen);
                this.ScreenObjects.EnemyProjectiles.push(proj);
            }        
        }
    }

    gameLoop(){ //coisas que devem acontecer a cada iteração, sem exceções, como o movimento de projéteis e a captação de input do jogador
        this.Engine.processCollision(this.ScreenObjects.Enemies,this.ScreenObjects.PlayerProjectiles);
        this.Engine.processCollision([this.ScreenObjects.Player],this.ScreenObjects.EnemyProjectiles);
        this.Engine.processProjectiles(this.ScreenObjects.PlayerProjectiles,"top");
        this.Engine.processProjectiles(this.ScreenObjects.EnemyProjectiles,"bottom");
        this.Engine.processInput(this.ScreenObjects.Player);  
        this.processActions();
        
    }

    moveLoop(){
        this.gameLoop();
        this.processMovement();
    }


    initializeEnemies(amount){

        for(let i=0;i<amount;i++){
            let enemy = new Enemy("enemy_"+i); 
            enemy.setImg("cat.svg")
            this.ScreenObjects.Enemies.push(enemy);  
        }

        this.positionEnemies();
        
    }

    initializePlayer(){
        this.ScreenObjects.Player = new Ship("player");
        this.ScreenObjects.Player.setX("45%");
        this.ScreenObjects.Player.setY("90%");
    }

    initializeGame(level){

        this.Config.DifficultyLevel = level;

        this.initializePlayer();
        this.initializeEnemies((level+1) * 23);
        
        this.drawGame();   
        this.startGame();
    }

    stopGame(){
        clearInterval(this.MainLoop);
        clearInterval(this.SecondaryLoop);
        this.State = false;
    }

    startGame(){
        this.MainLoop = setInterval(() => {this.gameLoop()}, 20);
        this.SecondaryLoop = setInterval(() => {this.moveLoop()}, 500);
        this.State = true;
    }
    

    shoot(){
        let proj = this.createProjectile(this.ScreenObjects.Player,0);
        proj.appendTo(this.Screen);
        this.ScreenObjects.PlayerProjectiles.push(proj);
    }
} 