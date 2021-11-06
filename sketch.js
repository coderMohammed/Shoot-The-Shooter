var boyImage,boy;
var treasure,treasureImage,treasureGroup;
var bullet,bulletImage,bulletGroup;
var bg,bgImg;
var bg2,bg2Img
var BEGIN = 0,LEVEL1 = 1,LEVEL2 = 2,WIN = 3,END = 4;
var gameState = BEGIN;
var isLevel1 = false;
var isLevel2 = false
var lives = 3
var enemyLives = 3
var invisibleGround,invisibleGround2,invisibleGround3;
var PLAY = 0;
var gameStateL2 = PLAY;
var score = 0;
var gameOverBg,gameOverBgImg;
var mainVillain,mainVillainImg;
var newPlayer,newPlayerImg
var winner,winnerImg;
var playerBullet,enemyBullet;
var playerGrp,enemyGrp;
var playBtn


function preload(){
  boyImage = loadImage("Assets/Running.gif");
  treasureImage = loadImage("Assets/unnamed (1).png");
  bulletImage = loadImage("Assets/bullet.png");
  bg2Img = loadImage("Assets/BG2.jpeg");
  gameOverBgImg = loadImage("Assets/gif.gif");
  mainVillainImg = loadImage("Assets/MainVillain.png");
  newPlayerImg = loadImage("Assets/NP.png");
  winnerImg = loadImage("Assets/giphy.gif");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  boy = createSprite(80,height-50);
  boy.addImage("run",boyImage);
  boy.scale = 0.2;
  boy.debug = true;
  boy.setCollider("rectangle",0,0,250,350);

  bulletGroup = new Group();
  treasureGroup = new Group();
  enemyGrp = new Group();
  playerGrp = new Group();
  
}

function draw() 
{ 

  background("green");
  if(gameState === BEGIN){
    playBtn = createButton("START THE GAME");
    playBtn.position(200,200);
    playBtn.mousePressed(start)
    }

    else if(gameState === LEVEL1){
  
      if(keyDown("space")){
        boy.y -= 18;
      }
  
  
  
      if(!isLevel1){
        isLevel1 = true;
        playBtn.visible = false;
        bg2 = createSprite(width/2,height/2);
        bg2.addImage("levelStart",bg2Img);
        bg2.scale = 2.2
        boy.depth = bg2.depth+1;
        boy.y = 500
        invisibleGround = createSprite(80,height-150,100,20);
        invisibleGround.visible = false;
      }
  
      boy.collide(invisibleGround);
  
      if(frameCount%150===0){
        spawnBullets()
      }
  
      if(frameCount%80===0){
        spawnTreasure()
      }
  
      boy.velocityY += 0.6;
  
       bg2.velocityX = -2
      if(bg2.x <= 600){
        bg2.x = width/2
      }
      
        if(boy.isTouching(bulletGroup)){
          lives -= 1;
          bulletGroup.destroyEach();
          if(lives===0){
            gameState=END;
          }
        }
    
        if(boy.isTouching(treasureGroup)){
          score += 25;
          treasureGroup.destroyEach();
          if(score >= 200){
            gameState = LEVEL2;
          }
          
        }
        
    }
    else if(gameState === LEVEL2){
      if(!isLevel2){
        isLevel2 = true;
        treasureGroup.destroyEach();
        boy.destroy()
        mainVillain = createSprite(900,275);
        mainVillain.addImage("superVillain",mainVillainImg)
        mainVillain.scale = 0.4;
        newPlayer = createSprite(80,310);
        newPlayer.addImage("player2",newPlayerImg);
        newPlayer.scale = 0.45;
        lives = 3;
      }
  
      if(keyDown("space")){
        shootBullet();
      }
  
      if(frameCount%100===0){
        spawnEnemyBullets();
      }
      
      newPlayer.collide(invisibleGround)
      newPlayer.y = World.mouseY;
  
      
  
      bg2.velocityX = 0;
  
      if(newPlayer.isTouching(enemyGrp)){
        lives -= 1;
        enemyGrp.destroyEach()
      if(lives === 0){
        gameState = END;
      }
      }
  
      if(mainVillain.isTouching(playerGrp)){
        enemyLives -= 1;
        playerGrp.destroyEach()
      if(enemyLives === 0){
        gameState = WIN;
      }
      }
  
    }
  
    else if(gameState === WIN){
      winner = createSprite(300,300,300,300);
      winner.addImage("win",winnerImg);
      winner.scale = 0.99
      bg2.destroy();
      newPlayer.destroy();
      mainVillain.destroy();
    }
  
    else if(gameState === END){ 
      //console.log("END");
      bg2.destroy();
      newPlayer.destroy();
      mainVillain.destroy();
      gameOverBg = createSprite(300,300);
      gameOverBg.addImage("GAmeOVer",gameOverBgImg);
      gameOverBg.scale = 1.5;
    }

    drawSprites();

  fill("red");
  textSize(20);
  text("PLAYER LIVES: "+lives,40,50);

  fill("red");
  textSize(20);
  text("ENEMY LIVES: "+enemyLives,250,50);

  fill("red");
  textSize(20);
  text("SCORE: "+score,450,50);

  }

  

function playerControls(){
  if(keyDown(UP_ARROW)){
    boy.y -= 15;
  }
  
  if(keyDown(DOWN_ARROW)){
    boy.y += 15;
  }
  
  if(keyDown(LEFT_ARROW)){
    boy.x -= 15;
  }
  
  if(keyDown(RIGHT_ARROW)){
    boy.x += 15;
  }

}

function createWalls(){
  wall1 = createSprite(20,20,20,1160);

  wall2 = createSprite(280,10,20,500);
  wall2.rotation = 90;

  wall3 = createSprite(130,400,20,460);

  wall4 = createSprite(245,160,20,250);
  wall4.rotation = 90;

  wall5 = createSprite(380,325,20,350);

  wall6 = createSprite(525,490,20,305);
  wall6.rotation = 90;

  wall7 = createSprite(540,176,20,350);

  wall8 = createSprite(590,341,20,80);
  wall8.rotation = 90;
}

function createEnemy(){
  enemy1 = createSprite(200,60);
  enemy1.addImage("enemy1",enemyImg1);
  enemy1.scale = 0.03;
  enemy1.velocityY = -4;
  enemy1.debug = true;

  enemy2 = createSprite(350,60);
    enemy2.addImage("enemy2",enemyImg2);
    enemy2.scale = 0.03;
    enemy2.velocityY = -4;
    enemy2.debug = true;

    
}

function spawnBullets(){
  bullet = createSprite(610,200,50,50);
  bullet.velocityX = -4
  bullet.y = Math.round(random(250,550))
  bullet.addImage("shoot",bulletImage);
  bullet.rotation = 180;
  bullet.scale = 0.1;
  bullet.lifetime = 610/4;
  bulletGroup.add(bullet);
}

function spawnTreasure(){
  treasure = createSprite(610,200,50,50);
  treasure.velocityX = -4
  treasure.y = Math.round(random(250,550))
  treasure.addImage("treasure",treasureImage);
  treasure.scale = 0.1;
  treasure.lifetime = 610/4;
  treasureGroup.add(treasure);
}

function shootBullet(){
  playerBullet = createSprite(150,width/2,50,20);
  playerBullet.y = newPlayer.y-30
  playerBullet.addImage("shoot",bulletImage);
  playerBullet.scale = 0.05;
  playerBullet.velocityX = 18;
  playerGrp.add(playerBullet);
}

function spawnEnemyBullets(){
  enemyBullet = createSprite(610,200,50,50);
  enemyBullet.velocityX = -18
  enemyBullet.y = Math.round(random(250,350))
  enemyBullet.addImage("shoot",bulletImage);
  enemyBullet.rotation = 180;
  enemyBullet.scale = 0.1;
  enemyBullet.lifetime = 610/7;
  enemyGrp.add(enemyBullet);
}

function start(){
  gameState = LEVEL1;

}