class Game{

    Screen = document.getElementById("screen");
    Player;
    Enemies = [];
    Projectiles = [];
    Keys = {};
    MainLoop;

    setKey(code,value){
        this.Keys[code] = value;
    }

    createProjectile(obj){
        let proj = new GameObject("projectile");
        proj.setPctValue("0.25%","width");
        proj.setX(-1 + obj.getX() + obj.getPxValue("width")/2);
        proj.setY(obj.getY()- obj.getPxValue("height")); 
        proj.setImg("projectile.svg");
        proj.appendTo(this.Screen);

        this.Projectiles.push(proj);
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

    refreshGame(){
        this.Player.setX(this.Player.getX());
        this.Player.setY("90%");
        
        this.initializeEnemies()
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

        // for(let i in this.Enemies){
        //     for(let index in this.Projectiles){
        //     let en = this.Enemies[i];
        //     if(proj.checkCollision(en)){
        //         this.Enemies.splice(i,1);
        //         en.destroy();
        //     }
            
        // }

        for(let index in this.Projectiles){
            let proj = this.Projectiles[index];
            if(proj.getY() > window.innerHeight || proj.getY() < 0 ){
                this.Projectiles.splice(index,1);
                proj.destroy();
            }
            else{
                
                proj.setY( proj.getY()-5);
            }

        }
    }

    initializeEnemies(){
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

    initializePlayer(){
        this.Player.setX("45%");
        this.Player.setY("90%");
    }

    startGame(enemies){

        this.Player = this.createGameObject("player","ship.svg");
        this.initializePlayer();

        for(let i=0;i<enemies;i++){
            let enemy = this.createGameObject("enemy_"+i,"cat.svg");
            this.Enemies.push(enemy);  
        }
        this.initializeEnemies();
        
        this.drawGame();   
        
        this.MainLoop = setInterval(() => {this.gameLoop()}, 20);
    }

    stopGame(){
        clearInterval(this.MainLoop);
    }

    shoot(){
        this.createProjectile(this.Player);
    }
} 