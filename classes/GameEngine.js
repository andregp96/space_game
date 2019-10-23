class GameEngine{

    Keys = {};
    Enemies = [];
    Player = new Ship("player");
    Projectiles = [
        [],
        []
    ];
    Background = new Array(2);
    Screen = document.getElementById("screen");


    constructor(diff_level){
        let rates = [0.999,0.997,0.995];
        this.initializeEnemies((diff_level+1) * 23,rates[diff_level]);
        this.initializePlayer();
        this.initializeBackground(diff_level+1);
    }

    addToScreen(obj){
        obj.appendTo(this.Screen);
    };

    resizeScreen(){
        this.Player.setX(this.Player.getX());
        this.Player.setY("85%");
       
        this.Background[0].setY(0);
        this.Background[1].setY('-100%');
    }

    spawnProjectile(obj,type){
        let proj = new Projectile("projectile",type);
        proj.setX(-2 + obj.getX() + obj.getWidth()/2);
        proj.setY(obj.getY() + 10); 

        this.Projectiles[type].push(proj);
        this.addToScreen(proj);
    }

    spawnEnemy(id,initial_x,initial_y,firerate){
        let en = new Enemy(id,firerate);
        en.setX(initial_x);
        en.setY(initial_y);

        this.Enemies.push(en);
        this.addToScreen(en);
    }

    initializeEnemies(amount, firerate){
        let x = 4;
        let y = 2;
        let speed_factor = 1;
        
        for(let i = 0;i < amount;i++){
            this.spawnEnemy('enemy_'+i,x+'%',y+'%',firerate);
            this.Enemies[i].setSpeed(this.Enemies[i].getSpeed() * speed_factor);
            
            if(x > 90){
                x = 4;
                y += 8;
                speed_factor = -speed_factor;
            }
            else{
                x += 4;  
            }     
        }  
    }

    initializePlayer(){
        this.Player.setX("45%");
        this.Player.setY("85%");

        this.addToScreen(this.Player);
    }

    //TODO: Talvez o objeto Background deva compreender os 2 paineis e comportamento deles
    initializeBackground(diff_level){

        this.Background[0] = new Background('panel_1',diff_level * 2);
        this.Background[0].appendTo(this.Screen,0,0);

        this.Background[1] = new Background('panel_2',diff_level * 2);
        this.Background[1].appendTo(this.Screen,0,"-100%");    
    }

    shoot(){
        this.spawnProjectile(this.Player,0);
    }

    processCollision(targets, projectiles){
        let result = false;

        for(let i in projectiles){
            let proj = projectiles[i];

            for(let j in targets){
                let tg = targets[j];
                if(tg.checkCollision(proj) == true){
                    targets.splice(j,1);
                    tg.destroy();
                    tg = undefined;

                    projectiles.splice(i,1);
                    proj.destroy();
                    proj = undefined;
                    
                    result = true;
                    
                    break;
                }
            }
        } 
        return result;
    }

    processInput(player){
        for(let key in this.Keys){
            if(this.Keys[key]){
                switch(key){
                    case "39":
                        player.moveRight();
                    break;
                
                    case "37":
                        player.moveLeft();
                    break;
        
                }
            }
        }  
    }

    processProjectiles(projectiles,direction){
        if(direction == "top"){
            for(let i in projectiles){
                let proj = projectiles[i];
                
                if(proj.getState() == "Dead"){
                    projectiles.splice(i,1);
                    proj.destroy();
                    proj = undefined;
                }
                else{
                    proj.moveUp();
                }          
            }
        }
        else{
            for(let i in projectiles){
                let proj = projectiles[i];
                
                if(proj.getState() == "Dead"){
                    projectiles.splice(i,1);
                    proj.destroy();
                    proj = undefined;
                }
                else{
                    proj.moveDown();
                } 
            }
        }
        
    }

    processEnemyBehavior(enemies,player){
        for(let index in enemies){
            let en = enemies[index];
            if(en.update(player)){
                this.spawnProjectile(en,1);
            }
        }   
    }

    processBackgroundAnimation(){
        //TODO: talvez o objeto Background deva conter este comportamento
        if(this.Background[0].moveDown()){
            this.Background[1].moveDown();
        }
        else{
            this.Background[0].resetPosition();
            this.Background[1].resetPosition();
        }
        
    }

    update(){
        let status = true;

        this.processCollision(this.Enemies,this.Projectiles[0]);
        if(this.processCollision([this.Player],this.Projectiles[1])){status = false;} 
        if(this.processCollision([this.Player],this.Enemies)){status = false;}

        this.processProjectiles(this.Projectiles[0],"top");
        this.processProjectiles(this.Projectiles[1],"down");

        this.processEnemyBehavior(this.Enemies,this.Player);

        this.processBackgroundAnimation();

        this.processInput(this.Player);    

        return status;
    }
}