class Game{

    Screen = document.getElementById("screen");
    Player;
    Enemies = [];
    PlayerProjectiles = [];
    EnemyProjectiles = []
    Keys = {};
    MainLoop;

    setKey(code,value){
        this.Keys[code] = value;
    }

    createProjectile(obj,src){
        let proj = new Projectile("projectile");
        proj.setX(-1 + obj.getX() + obj.getPxValue("width")/2);
        proj.setY(obj.getY()- obj.getPxValue("height")); 
        proj.setImg(src);

        return proj;
    }

    createGameObject(id,src){
        let obj = new GameObject(id);

        obj.setImg(src);

        return obj;
    }

    drawGame(){
        this.Player.appendTo(this.Screen);
        for(let i=0;i<this.Enemies.length;i++){
            this.Enemies[i].appendTo(this.Screen);
        }
    }

    positionEnemies(){
        let x = 4;
        let y = 2;
        
        for(let i = 0;i < this.Enemies.length;i++){

            this.Enemies[i].setX(x + "%");
            this.Enemies[i].setY(y + "%");
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
        this.Player.setX(this.Player.getX());
        this.Player.setY("90%");
        
        this.positionEnemies();
    }

    processInput(){
        for(let key in this.Keys){
            if(this.Keys[key]){
                switch(key){
                    case "39":
                        this.Player.moveRight();
                    break;
                
                    case "37":
                        this.Player.moveLeft();
                    break;
        
                }
            }
        }  
    }

    processCollision(){

        for(let i in this.PlayerProjectiles){

            let proj = this.PlayerProjectiles[i];

            for(let j in this.Enemies){
                let en = this.Enemies[j];
                if(en.checkCollision(proj) == true){
                    this.Enemies.splice(j,1);
                    en.destroy();
                    this.PlayerProjectiles.splice(i,1);
                    proj.destroy();
                }
            }
        }

        for(let i in this.EnemyProjectiles){

            let proj = this.EnemyProjectiles[i];

            if(this.Player.checkCollision(proj) == true){
                this.EnemyProjectiles.splice(i,1);
                proj.destroy();
                this.Player.destroy();
                this.stopGame();     
            }
        }
        
    }

    processMovement(){

        for(let index in this.PlayerProjectiles){

            let proj = this.PlayerProjectiles[index];
            if(proj.getState() == "Dead"){
                this.PlayerProjectiles.splice(index,1);
                proj.destroy();
            }
            else{
                proj.moveUp();
            }
            
        }

        for(let index in this.EnemyProjectiles){

            let proj = this.EnemyProjectiles[index]; 
            if(proj.getState() == "Dead"){
                this.EnemyProjectiles.splice(index,1);
                proj.destroy();
            }
            else{
                proj.moveDown();
            }
        }

        
    }

    processActions(){
        for(let index in this.Enemies){

            let en = this.Enemies[index];

            if(Math.random() >= 0.99){
                let proj = this.createProjectile(en,"enemy_projectile.svg");
                proj.appendTo(this.Screen);
                this.EnemyProjectiles.push(proj);
            }        
        }
    }

    gameLoop(){     
        this.processCollision();
        this.processInput();
        this.processMovement();
        this.processActions();
    }

    initializeEnemies(amount){

        for(let i=0;i<amount;i++){
            let enemy = new Enemy("enemy_"+i); 
            enemy.setImg("cat.svg")
            this.Enemies.push(enemy);  
        }

        this.positionEnemies();
        
    }

    initializePlayer(){
        this.Player = new Ship("player");
        this.Player.setImg("ship.svg");
        this.Player.setX("45%");
        this.Player.setY("90%");
    }

    startGame(enemies){

        this.initializePlayer();
        this.initializeEnemies(enemies);
        
        this.drawGame();   
        
        this.MainLoop = setInterval(() => {this.gameLoop()}, 20);
    }

    stopGame(){
        clearInterval(this.MainLoop);
    }

    shoot(){
        let proj = this.createProjectile(this.Player,"player_projectile.svg");
        proj.appendTo(this.Screen);
        this.PlayerProjectiles.push(proj);
    }
} 