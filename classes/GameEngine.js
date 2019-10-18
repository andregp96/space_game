class GameEngine{

    Keys = {};

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

    spawnProjectile(obj,type){
        let proj = new Projectile("projectile",type);
        proj.setX(-1 + obj.getX() + obj.getWidth()/2);
        proj.setY(obj.getY()- obj.getHeight()); 

        return proj;
    }
}