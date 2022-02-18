var trex, ground;
var groundImg, cloudImg;
var trex_animation;
var invisibleGround;
var obstacle, obstacle1Img, obstacle2Img, obstacle3Img, obstacle4Img, obstacle5Img, obstacle6Img;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var jumpSound, dieSound, checkPointSound;
var score = 0;
var obstaclesGroup, cloudsGroup;

function preload() {
  //load sounds, images or animations in a variable
  groundImg = loadImage("ground2.png");

  trex_animation = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  cloudImg = loadImage("cloud.png");
  obstacle1Img = loadImage("obstacle1.png");
  obstacle2Img = loadImage("obstacle2.png");
  obstacle3Img = loadImage("obstacle3.png");
  obstacle4Img = loadImage("obstacle4.png");
  obstacle5Img = loadImage("obstacle5.png");
  obstacle6Img = loadImage("obstacle6.png");

  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkpoint.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //create sprites, give velocities, scaling
  trex = createSprite(50, height - 40, 40, 30);
  trex.addAnimation("running", trex_animation);
  trex.scale = 0.5;

  trex.debug = false;
  //shape_name, x,y,width/radius,height,rotation
  trex.setCollider("circle", 0,0,45);

  ground = createSprite(width / 2, height - 50, width, 20);
  ground.addImage(groundImg);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  //WHEN EVER I WANT SOMTHINHG TO BE THERE BUT WAHT IT TO BE NOT SEEN THEN PUT THE NAME.VISIBLE = FALSE
  invisibleGround = createSprite(300, height - 30, 600, 10);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();

  cloudsGroup = new Group();
}


function draw() {
  //set background color 
  background(175);
  textSize(25);
  text("Score: "+score, width-200,50);

  //bussiness logic
  if (gameState == PLAY) {

    //put the math.round so we dont get a dec in the score.
    score = score + Math.round(getFrameRate()/60);
    if(score > 0 && score % 100 == 0){
      checkPointSound.play();
    }

    ground.velocityX = -4;
    //infinite ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && trex.y > height-100) {
      trex.velocityY = -10;
      jumpSound.play();
    }
    trex.velocityY = trex.velocityY + 1.5;

    createClouds();
    createObstacle();

    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
      dieSound.play();
    }

  } else if (gameState == END) {
    ground.velocityX = 0;

    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    obstaclesGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);
  }

  trex.collide(invisibleGround);

  

  drawSprites();
}

function createClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(width, 50, 30, 20);
    cloud.scale = 0.5;
    cloud.addImage(cloudImg);
    cloud.velocityX = -4;
    cloud.y = Math.round(random(20, 120));

    trex.depth = cloud.depth;
    trex.depth = trex.depth + 1;

    cloud.lifetime = 600;
    cloudsGroup.add(cloud);
  }
}

function createObstacle() {
  if (frameCount % 60 === 0) {
    obstacle = createSprite(width, height - 40, 30, 20);
    obstacle.velocityX = -4;

    var rand = Math.round(random(1, 6));

    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1Img);
        break;
      case 2:
        obstacle.addImage(obstacle2Img);
        break;
      case 3:
        obstacle.addImage(obstacle3Img);
        break;
      case 4:
        obstacle.addImage(obstacle4Img);
        break;
      case 5:
        obstacle.addImage(obstacle5Img);
        break;
      case 6:
        obstacle.addImage(obstacle6Img);
        break;
      default:
        break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 600;
    obstaclesGroup.add(obstacle);
  }
}