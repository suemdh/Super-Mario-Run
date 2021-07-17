var PLAY=1;
var END=0;
var gameState=PLAY;




var score=0;

var ground,invisibleGround,groundImg;







function preload(){

coinImg=loadImage("coin.png");
mario_running = loadAnimation("mario1.png","mario2.png");
mario_sad = loadAnimation("sadMario.jpg");
monsterImg=loadImage("monster.png")
monster2Img=loadImage("monster2.png")
monster3Img=loadImage("monster3.png")
monster4Img=loadImage("monster4.png")
monster5Img=loadImage("monster5.png")
monster6Img=loadImage("monster6.png")

backgroundImg=loadImage("background.png")
GameOverImg=loadImage("gameover.png")
groundImg=loadImage("ground.png")
restartImg=loadImage("restart.png")



dieSound=loadSound("die.wav")
jumpSound=loadSound("jump.wav")
coinSound=loadSound("coin.wav")
checkpointSound=loadSound("checkpoint.wav")
restartSound=loadSound("restart.wav")
}

function setup() {
 createCanvas(windowWidth,windowHeight)

  
 
 trex = createSprite(50,height-50,20,50);
  trex.addAnimation("running", mario_running);
  trex.addAnimation("collided", mario_sad);
  trex.setCollider('circle',0,0,350)
  trex.scale = 0.14
  trex.debug=false;
  

ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImg);
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);
  
  

  gground=createSprite(width/2,height-10,width,125);
  gground.visible=false;
  gground.shapeColor = "green";
  gground.x = width/2
  

  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(GameOverImg);
  
  restart = createSprite(750,400);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.3;
  restart.scale = 0.2;

  gameOver.visible = false;
  restart.visible = false;
   
  monstersGroup = new Group();

  score=0;


  
  
  

  
  
  


}

function draw() {
background(backgroundImg)
textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
   
  if (gameState === PLAY){
    
  score = score + Math.round(getFrameRate()/60);
  ground.velocityX = -(6 + 3*score/100);

  
  trex.collide(gground);
  if(keyDown("space")&& trex.y  >= height-140) {
    trex.velocityY = -10;
    jumpSound.play();
  }


  trex.velocityY=trex.velocityY + 0.8


  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  spawnMonsters();

  if(monstersGroup.isTouching(trex)){
    dieSound.play()
    gameState = END;
}
 }
  
    
 else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  
  //set velcity of each game object to 0
  ground.velocityX = 0;
  trex.velocityY = 0;
  monstersGroup.setVelocityXEach(0);
  
  
  //change the trex animation
  trex.changeAnimation("collided",mario_sad);
  
  //set lifetime of the game objects so that they are never destroyed
  monstersGroup.setLifetimeEach(-1);
  


 }
  
 if(mousePressedOver(restart)) {
  reset();
  restartSound.play();
}


   










drawSprites();
}


function spawnMonsters() {

  if(frameCount % 60 === 0) {
    var monster = createSprite(600,height-95,20,30);
    monster.setCollider('circle',0,0,45)
  
  
  
  
  monster.velocityX = -(6 + 3*score/150);
    
  var rand = Math.round(random(1,6));
  switch(rand) {
    case 1: monster.addImage(monsterImg);
            break;
    case 2: monster.addImage(monster2Img);
            break;
    case 3: monster.addImage(monster3Img);
            break;v
    case 4: monster.addImage(monster4Img);
            break;
    case 5: monster.addImage(monster5Img);
            break;
    case 6: monster.addImage(monster6Img);
            break;
    default: break;
} 
      

    
    
    //assign scale and lifetime to the obstacle           
    monster.scale = 0.40;
    monster.lifetime = 300;
    monster.depth = trex.depth;
    trex.depth +=1;
    //add each obstacle to the group
    monstersGroup.add(monster);
  

  
}


}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  monstersGroup.destroyEach();
  
  
  trex.changeAnimation("running",mario_running);
  
  score = 0;
  
}