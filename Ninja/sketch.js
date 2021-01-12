var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var ninja,ninjaImg;
var invisibleClimber,invisibleClimberGroup;
var gameState="play";
var backSound;


function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  doorGroup=new Group();
  climberImg=loadImage("climber.png");
  climberGroup=new Group();
  ninjaImg=loadImage("ninja.png");
  invisibleClimberGroup=new Group();
 // backSoundSound=loadSound("backSound.mp3"); 
  
}

function setup(){
  
createCanvas(600,600);
 tower=createSprite(270,300);
  tower.addImage(towerImg);
 tower.velocityY=1; 
   ninja=createSprite(300,300);
  ninja.addImage(ninjaImg);
  ninja.scale=0.5;
  climberGroup.setColliderEach("rectangle",0,0,climberGroup.width,climberGroup.height);
  ninja.setCollider("rectangle",0,0,ninja.width,ninja.height);
  climberGroup.scaleEach=0.02;
  doorGroup.scaleEach=0.02;
}

function draw(){
  background(0);
  


 if (gameState==="play"){
   
  
  
  if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("left_arrow")){
    ninja.x=ninja.x-3;
  }
  
  
  if(keyDown("right_arrow")){
    ninja.x=ninja.x+3;
  }
  
  if(keyDown("space")) {
    ninja.velocityY=-5;
  }
  
  ninja.velocityY=ninja.velocityY +0.8; 
  
  
  if(climberGroup.isTouching(ninja) || ninja.y>600){
    ninja.destroy();
     gameState = "end";  
    
}
  
   invisibleClimberGroup.depth=climberGroup;
   invisibleClimberGroup.depth=invisibleClimberGroup.depth+1;

   
   invisibleClimberGroup.depth=doorGroup;
   invisibleClimberGroup.depth=invisibleClimberGroup.depth+1;
   
  spawnDoors();
  
  ninja.bounceOff(invisibleClimberGroup);

  drawSprites();
 }
  
  if (gameState === "end"){
    stroke("red");
    fill ("green");
    textSize(30);
    text("Game Over",230,250);
    
  }
  
}

function spawnDoors(){
  if (frameCount%450===0){
  door = createSprite(200,-50);
  door.addImage(doorImg);
    
    climber=createSprite(200,10);
    climber.addImage(climberImg);
    
      invisibleClimber=createSprite(200,-125,climber.width,5);
  
  door.velocityY= 1;
  door.x=Math.round(random(120,400))
    
  climber.velocityY= 1;          
  climber.x=door.x;
    
    
  invisibleClimber.x=door.x;
   invisibleClimber.velocityY=1;
      
    
    door.lifetime=800;  
  doorGroup.add(door);   
    ninja.depth=door.depth;
    ninja.depth=ninja.depth+1;                                   
    invisibleClimberGroup.add(invisibleClimber);                  
    climber.lifetime=800;
    climberGroup.add(climber);
    
        
    
    
  }
  
}
