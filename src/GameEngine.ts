class GameEngine{

    Keys:{[key: number]:boolean} = {};
    Enemies: Enemy[] = [];
    Player = new Ship("player");
    Projectiles: Projectile[][]= [
        [],
        []
    ];
    Background: Background = undefined;
    Screen = document.getElementById("screen");
    FireReady = true;

    constructor(diff_level: number){
        let rates = [0.999,0.997,0.995];
        this.initializeEnemies((diff_level+1) * 23,rates[diff_level]);
        this.initializePlayer();
        this.initializeBackground(diff_level+1);
    }

    destroy(){
        for(let i in this.Enemies){
            this.Enemies[i].destroy();
        }
        for(let i in this.Projectiles[0]){
            this.Projectiles[0][i].destroy();
        }
        for(let i in this.Projectiles[1]){
            this.Projectiles[1][i].destroy();
        }

        this.Player.destroy();
        this.Background.destroy();
        this.Screen.style.display = "none";
    }

    setKey(code: number, value: boolean){
        this.Keys[code] = value;
    }

    addToScreen(obj:GameObject){
        obj.appendTo(this.Screen);
    };

    resizeScreen(){
        this.Player.setX(this.Player.getX());
        this.Player.setY("85%");
       
        this.Background.resetPosition();
    }

    spawnProjectile(obj:GameObject, type: number){
        let proj = new Projectile("projectile", type);
        proj.setX(-2 + obj.getX() + obj.getWidth()/2);
        proj.setY(obj.getY() + 10); 

        this.Projectiles[type].push(proj);
        this.addToScreen(proj);
    }

    spawnEnemy(id:string, initial_x:string, initial_y:string, firerate:number){
        let en = new Enemy(id,firerate);
        en.setX(initial_x);
        en.setY(initial_y);

        this.Enemies.push(en);
        this.addToScreen(en);
    }

    initializeEnemies(amount:number, firerate:number){
        let x = 4;
        let y = 2;
        let speed_factor = 1;
        
        for(let i = 0;i < amount;i++){
            this.spawnEnemy('enemy_'+i, x+'%', y+'%', firerate);
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

    initializeBackground(diff_level: number){
        this.Background = new Background(diff_level*2,this.Screen);    
    }

    shoot(){
        if(this.FireReady){
            this.FireReady = false;
            this.spawnProjectile(this.Player,0);
        }
        
    }

    processCollision(targets: GameObject[], projectiles: GameObject[]){
        let result = false;

        for(let i in projectiles){
            let proj = projectiles[i];

            for(let j in targets){
                let tg = targets[j];
                if(tg.checkCollision(proj) == true){
                    targets.splice(parseInt(j),1);
                    tg.destroy();
                    tg = undefined;

                    projectiles.splice(parseInt(i),1);
                    proj.destroy();
                    proj = undefined;
                    
                    result = true;
                    
                    break;
                }
            }
        } 
        return result;
    }

    processInput(player:Ship){
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

    processProjectiles(projectiles: Projectile[], direction: "top" | "down"){

        if(direction == "top"){
            for(let i in projectiles){
                let proj = projectiles[i];
                
                if(proj.getState() == "Dead"){
                    projectiles.splice(parseInt(i),1);
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
                    projectiles.splice(parseInt(i),1);
                    proj.destroy();
                    proj = undefined;
                }
                else{
                    proj.moveDown();
                } 
            }
        }
        
    }

    processEnemyBehavior(enemies:Enemy[],player: Ship){
        for(let index in enemies){
            let en = enemies[index];
            if(en.update(player) && this.Projectiles[1].length < 16){
                this.spawnProjectile(en,1);
            }
        }   
    }

    update(){
        let status = 0;
        this.FireReady = true;

        this.processCollision(this.Enemies,this.Projectiles[0]);
        if(this.processCollision([this.Player],this.Projectiles[1])){status = 1;} 
        if(this.processCollision([this.Player],this.Enemies)){status = 1;}

        this.processProjectiles(this.Projectiles[0],"top");
        this.processProjectiles(this.Projectiles[1],"down");

        this.processEnemyBehavior(this.Enemies,this.Player);

        this.Background.animate();
        if(this.Enemies.length == 0){status = 2;}

        this.processInput(this.Player);    

        return status;
    }
}