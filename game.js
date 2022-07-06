var buttonColors=["red","blue","green","yellow"];

var gamePatterm=[];

var userClickedPattern=[];

var start=false;
var level=0;

$(document).keydown(function(){
    if(!start){
        $("#level-title").text("Level "+level);
        nextSequence();
        start=true;
    }
});



$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentLevel){
    if(gamePatterm[currentLevel]===userClickedPattern[currentLevel]){

        if(gamePatterm.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over,Press Any Key to Restart")

        startOver();


    }
}

function nextSequence(){

    userClickedPattern=[];

    level++;
    $("#level-title").text("Level "+level);


    var randonNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randonNumber];
    gamePatterm.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    
}



function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}




function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}



function startOver(){
    level=0;
    start=false;
    gamePatterm=[];

}