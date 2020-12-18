
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var SURVIVALTIME=0;
var score=0;
var gamestate="play"
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(500,450)
monkey=createSprite(80,315,20,20);
monkey.addAnimation("moving", monkey_running); 
monkey.scale=0.1
  
ground=createSprite(400,350,900,10)
ground.velocityX=-4
ground.x=ground.width/2
console.log(ground.x)
FoodGroup=createGroup();
obstacleGroup=createGroup(); 
}


function draw() {
background("cyan")
  if(gamestate==="play"){
  monkey.collide(ground)
 if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -8;
   }
      if (ground.x < 0){
      ground.x = ground.width/2;
    }
  monkey.velocityY = monkey.velocityY + 0.5
  spawnObstacle()
  bananas()
 drawSprites();
    stroke("white")
fill("white")
text("score:"+ score, 350,50);
stroke("black")
textSize(20)
fill("black")
SURVIVALTIME= Math.ceil(frameCount/frameRate())
text("SURVIVALTIME:" + SURVIVALTIME, 100,50)

  
if(monkey.isTouching(FoodGroup)){
  
  FoodGroup.destroyEach();
  score=score+1
}
  
  }
if (obstacleGroup.isTouching(monkey)){
  gamestate="end"
  monkey.velocityY=0
  obstacleGroup.setVelocityXEach(0)
  
  FoodGroup.setVelocityXEach(0)
  
  text("GAME OVER" , 200,200)
  textSize(40)
  stroke("white")
  fill("black")
  text("PRESS R TO RESET", 200, 210)
  textSize(40)
}
  
  if(keyDown("R")){
    gamestate="play"
    SURVIVALTIME=0
    score=0
    
  }

    }


 function spawnObstacle(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,320,50,50);
    obstacle.addImage( obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
   if(monkey.isTouching(obstacleGroup)){
     
   }
 }
function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,200, 50, 50 )
    banana.addImage( bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    FoodGroup.add(banana);
    FoodGroup.add(banana);

    
  }

     

 }