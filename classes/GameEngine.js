class GameEngine{

    Keys = {};
    Enemies = [];
    Player = new Ship("player");
    Projectiles = [
        [],
        []
    ];
    Screen = document.getElementById("screen");


    constructor(diff_level){
        let rates = [0.999,0.997,0.995];
        this.initializeEnemies((diff_level+1) * 23,rates[diff_level]);
        this.initializePlayer();

    }

    addToScreen(obj){
        obj.appendTo(this.Screen);
    };

    resizeScreen(){
       this.Player.setX(this.Player.getX());
       this.Player.setY("90%");
    }

    spawnProjectile(obj,type){
        let proj = new Projectile("projectile",type);
        proj.setX(-1 + obj.getX() + obj.getWidth()/2);
        proj.setY(obj.getY()- obj.getHeight()); 

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
        this.Player.setY("90%");

        this.addToScreen(this.Player);
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

    

    update(){
        this.processCollision(this.Enemies,this.Projectiles[0]);
        this.processCollision([this.Player],this.Projectiles[1]);
        this.processCollision([this.Player],this.Enemies);

        this.processProjectiles(this.Projectiles[0],"top");
        this.processProjectiles(this.Projectiles[1],"down");

        this.processEnemyBehavior(this.Enemies,this.Player);

        this.processInput(this.Player);    
    }
}