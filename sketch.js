// we have to press the up arrow key constantly so that sofia will be in the canvas, if she fell out of the canvas the game will be over.
// gameOver condition - when sofia.y>580   

var gameState = "play"
var Score = 0

var sofia,sofiaImg;
var police,policeImg;
var diamond, diamondImg, snowflake, snowflakeImg, fireball , fireballImg;
var rock, rockImg, water, waterImg, tree, treeImg;
var bg, bgImg;
var gameover ,gameoverImg;
var obstacleGroup , powerupGroup;

function preload(){
 sofiaImg = loadAnimation("Images/1.png","Images/2.png","Images/3.png","Images/4.png")
 policeImg = loadAnimation("Images/police_1.png","Images/police_2.png","Images/police_3.png","Images/police_4.png")

 diamondImg = loadImage("Images/diamond.png")
 snowflakeImg = loadImage("Images/snowflake.png")
 fireballImg = loadImage("Images/fireball.png")
 rockImg = loadImage("Images/rock.png")
 waterImg = loadImage("Images/water.png")
 treeImg = loadImage("Images/tree.png")

 bgImg = loadImage("Images/bg1.jpg")
 gameoverImg = loadImage("Images/gameover.png")
 
}
function setup(){
    createCanvas(1000,580)
 bg=createSprite(500,290,1000,580)
 bg.addImage(bgImg)
 bg.scale=2

 sofia = createSprite(122,415,10,10)
 sofia.addAnimation("running",sofiaImg)
 sofia.scale=2.5

 police = createSprite(50,430,10,10)
 police.addAnimation("running",policeImg)
 police.scale = 0.5

 obstacleGroup = new Group();
 powerupGroup = new Group();


}

function draw(){
  background("green")

    if( gameState === "play"){ 

        for(var i = 0; i <powerupGroup.length; i++){

            if(sofia.isTouching(powerupGroup.get(i))){
               Score = Score+5 
               powerupGroup.get(i).destroy();
   
            }
   
          }

 if(keyDown("right_arrow")){
     sofia.x = sofia.x+5
 }

 if(keyDown("up_arrow")){
     sofia.velocityY = -4
 }

 sofia.velocityY = sofia.velocityY+0.5
 
 spawnPowercoins();
  spawnObstacles();
 drawSprites();

 text(mouseX+","+mouseY,mouseX,mouseY)
  
  if(sofia.y > 580 || obstacleGroup.isTouching(sofia) ){
      gameState = "over"
  }

    }
 
    if(gameState === "over"){
        imageMode(CENTER)
     image(gameoverImg, 500,290 )

        text(mouseX+","+mouseY,mouseX,mouseY)
    }
 
     text("Points:"+Score,350,55)

}

function spawnPowercoins(){
 
    if(frameCount % 80 === 0){
       powerup = createSprite(1000,302,10,10)
       powerup.y = Math.round(random(94,274))   

       var power = Math.round(random(1 , 5))

       switch(power){
           case 1 : powerup.addImage(diamondImg)
                    powerup.scale = 0.25
            break;

            case 2 : powerup.addImage(fireballImg)
                    powerup.scale = 0.2
            break;

            case 3 :  powerup.addImage(snowflakeImg)
                      powerup.scale = 0.3
            break;

            case 4 : powerup.addImage(diamondImg)
                      powerup.scale = 0.15
            break;

            case 5 :  powerup.addImage(snowflakeImg)
                      powerup.scale = 0.2
            break;

            default:break;
       }
       
       powerup.velocityX = -5
       powerupGroup.add(powerup)

    }

       

}


function spawnObstacles(){
 
    if(frameCount % 80 === 0){
       Obstacle = createSprite(1500,462,10,10)

       var track = Math.round(random(1 , 3))

       switch(track){
           case 1 : Obstacle.addImage(rockImg)
           Obstacle.scale = 0.3
            break;

            case 2 : Obstacle.addImage(treeImg)
            Obstacle.scale = 0.3
            break;

            case 3 :  Obstacle.addImage(waterImg)
            Obstacle.scale = 0.3
            break;

            default:break;
       }
       
       Obstacle.velocityX = -6
      
        obstacleGroup.add(Obstacle)
    }
  

}