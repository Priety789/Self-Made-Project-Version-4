var ground;
var ball;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var step;
var ballConstraint;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var score = 0;
var star = [];
var timer = 120;
var gameState = "play";
var sound;
var backgroundColor = "black";

function preload() {
    sound = loadSound("sounds/funparty.mp3 ");
}

function setup() {
	//createCanvas(1500, 700);
    createCanvas(windowWidth, windowHeight);
    console.log(windowHeight);

	engine = Engine.create();
	world = engine.world;

	ground = Bodies.rectangle(windowWidth / 2, windowHeight - 120, windowWidth, 40, {isStatic:true} );
 	World.add(world, ground);

    ball = new Ball(windowWidth / 2 - 550, windowHeight / 2 - 110, 20);

    ballConstraint = new Sling(ball.body, { x: 200, y: 300 });

    obstacle1 = new Obstacle(windowWidth / 2 - 600, windowHeight - 140, 40, 40);
    obstacle2 = new Obstacle(windowWidth / 2 - 400, windowHeight - 140, 40, 40);
    obstacle3 = new Obstacle(windowWidth / 2 - 200, windowHeight - 140, 40, 40);
    obstacle4 = new Obstacle(windowWidth / 2 + 200, windowHeight - 140, 40, 40);
    obstacle5 = new Obstacle(windowWidth / 2 + 400, windowHeight - 140, 40, 40);
    obstacle6 = new Obstacle(windowWidth / 2 + 600, windowHeight - 140, 40, 40);

    step = new Step(windowWidth/2, windowHeight - 185, 200, 100);

	Engine.run(engine);
}

function draw() {
    background(backgroundColor);

    //sound.play();

    ball.display();

    fill("pink");
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, windowWidth, 40);

    /*obstacle1.jump();
    obstacle2.jump();
    obstacle3.jump();
    obstacle4.jump();
    obstacle5.jump();
    obstacle6.jump();*/

    obstacle1.score();
    obstacle2.score();
    obstacle3.score();
    obstacle4.score();
    obstacle5.score();
    obstacle6.score();

    obstacle1.display();
    obstacle2.display();
    obstacle3.display();
    obstacle4.display();
    obstacle5.display();
    obstacle6.display();

    step.display();

    ballConstraint.display();

    fill(255);
    textSize(20);

    if (gameState === "play") {
        text("Use the ball to catch the stars and increase your score!", windowWidth / 2 - 250, windowHeight / 2 - 360);
        text("Avoid the obstacles! They will decrease your score!", windowWidth / 2 - 230, windowHeight / 2 - 310);
        text("Use the mouse to direct the ball, and the space bar to try again!", windowWidth / 2 - 300, windowHeight / 2 - 260);
        text("You have two minutes! Go!", windowWidth / 2 - 150, windowHeight / 2 - 210);
        addStars();
        setTimer();
    }

    endGame();

    text("Score: " + score, windowWidth - 150, windowHeight / 2 - 360);

    text("Timer: " + timer, windowWidth - 150, windowHeight / 2 - 260);
}

function mouseDragged() {
    Matter.Body.setPosition(ball.body, { x: mouseX, y: mouseY });
}

function mouseReleased() {
    ballConstraint.fly();
    backgroundColor = color(random(0, 255), random(0, 255), random(0, 255));
}

function keyPressed() {
    if (keyCode === 32) {
        ballConstraint.attach(ball.body);
    }
}

function addStars() {
    if (frameCount % 80 === 0) {
        star.push(new Star(random(0, windowWidth), windowHeight - 220, 40, 40));
    }

    for (var i = 0; i < star.length; i++) {
        star[i].points();
        star[i].display();
    }
}

function setTimer() {
    if (frameCount % 30 === 0) {
        timer -= 1;
    }

    if (timer < 0) {
        timer = 0;
        gameState = "end";
    }
}

function endGame() {
    if (gameState === "end") {
        mouseDragged = null;
        mouseReleased = null;
        keyPressed = null;
        text("Game Over!", windowWidth / 2 - 50, windowHeight / 2 - 85);
    }
}