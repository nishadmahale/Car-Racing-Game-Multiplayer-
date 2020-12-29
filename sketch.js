var ball;

var database;
var position;

function setup(){
    createCanvas(500,500);
    database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";


    var ballRef = database.ref('ball/position');
    //{x:200, y:200}
    //listener
    ballRef.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').update({
        x: ball.x + x,
        y: ball.y + y
    })
}


function readPosition(data){

    position = data.val(); //{x:200,y:200}
    ball.x = position.x;
    ball.y = position.y;
    console.log(position);

}

function showError(){
    console.log("Error");
}
