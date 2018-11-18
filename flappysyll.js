var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
cvs.width = 320;
cvs.height = 512;
var cw = cvs.width;
var ch = cvs.height;
var currentState  
var startGame;
var game 
var paused
var end
// load images
var bg = new Image();
var fail = new Image();
var player = new Image();
var ground = new Image();
var pipeN = new Image();
var pipeS = new Image();
fail.src = "images/fail.jpg";
bg.src = "images/bg.jpg";
player.src = "images/player.png";
ground.src = "images/ground.png";
pipeN.src = "images/pipeN.png";
pipeS.src = "images/pipeS.png";

//audio

var jump = new Audio();
var scoreHit = new Audio();
var slap = new Audio();
jump.src = "sounds/jump.mp3";
scoreHit.src = "sounds/scoreHit.mp3";
slap.src = "sounds/slap.wav   ";
// rest of variables 
var paused = false;
var gap = 110;
var constant;
var bX = 10;
var bY = 150;
var gravity = 2;
var score = 0;
//keys
const keys = {
    KeyP : false,
    Enter : false,
    Space : false,
    listener(e){
       if(keys[e.code] !== undefined){
           keys[e.code] = e.type === "keydown";
           e.preventDefault();
        }
    }
}
document.addEventListener("keydown",keys.listener);
document.addEventListener("keyup",keys.listener);
document.addEventListener("keydown",moveUp);
//jump key
function moveUp(){
     if(keys.Space){
        console.log("work");
        keys.Space = true;
          bY -= 45  ;
        jump.play();
   }
  
}

// obstacles
var pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
};
// state fisrt -game start
function startGame (){
    // code to do a single frame of start game
   // display press enter to start
   if(keys.Enter){
      keys.Enter = false;
      currentState = game;  // start the game
   }
}
//gamne pause
function pause(){
    // code to do a single frame of pause
   // display pause
    if(keys.KeyP){
       keys.KeyP = false; // turn off key
       currentState = game;   // resume game
    }

}
// game core - draw
function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeN.height+gap;
        ctx.drawImage(pipeN,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeS,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeN.height)-pipeN.height
            }); 
        }

        // fail detect
        if( bX + 20 >= pipe[i].x 
            && bX <= pipe[i].x + pipeN.width 
            && (bY <= pipe[i].y + pipeN.height 
                || bY  + 15 >= pipe[i].y+constant) 
                || bY + 40    >=  cvs.height - ground.height){
                    console.log("fail")
                    slap.play();
                    
                    setTimeout(function(){ctx.drawImage(fail,120,200,190,190); alert("Faild"),location.reload();  }, 2000);
                    // 
                }
        if(pipe[i].x == 5){
            score++;
            scoreHit.play();
        }
         
        
    }

    ctx.drawImage(ground,0,cvs.height - ground.height,cw,120);
    
    ctx.drawImage(player,bX,bY,40,45);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();
// function game () {
//     draw();
  
// }
// requestAnimationFrame(draw); 

    