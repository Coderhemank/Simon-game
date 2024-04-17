var buttonColors= ["red","blue","green","yellow"];
var gamePattern= [];
var userClickedPattern= [];
var level=0;
var gameRunning= false;
var randomChosenColor;
var buttonIterator=0;
const wrongAudio = new Audio('sounds/wrong.mp3');
var highscore=0;
var isMute=false;

var startGame=()=>{
    $("#highscore").html("");  
    gameRunning=true;
    nextLevel();
}

var nextLevel=async() =>{
    $(".btn").off();
    level++;                                              //increasing level in title


    highscore=localStorage.getItem("highscore");
    if(level>highscore)
    localStorage.setItem("highscore",level);

    buttonIterator=0;
    $("h2").css("color", "white");
    $("h2").text("level "+level); 

    var randomNumber=Math.floor(Math.random()*4);         //choosing random color
    randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    userClickedPattern=[];
    await colorIterator();
    makeClickable();
}

var colorIterator =async () =>{
    for (const color of gamePattern) {
        await displayLevel(color);
      }
}
var displayLevel=async (color) =>{
    return new Promise( resolve=>{
        setTimeout(()=>{
            $("#"+color).fadeOut(300).fadeIn((300));

            resolve();
        },500);
    });
}

var makeClickable=()=>{

    $(".btn").click((e) => {

    if(gameRunning)
    {
    var userChosenColor = e.target.id;         //id is the color of the button
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    // only checks answer when the whole answer is given by the user
    if(userChosenColor !== gamePattern[buttonIterator++])
    checkAnswer();
    else if(gamePattern.length===userClickedPattern.length)
    checkAnswer();    
    }
}); 
}

var checkAnswer= () =>{
    console.log(JSON.stringify(gamePattern))
    console.log(JSON.stringify(userClickedPattern))
    //checking if random generated colors and user clicked colors are equal or not.
    if(JSON.stringify(gamePattern)===JSON.stringify(userClickedPattern))
    nextLevel();
    else
    gameOver();
}

var playSound = name =>{
    if(!isMute)
    {
        var nameAudio = new Audio("sounds/"+name+".mp3");
        nameAudio.play();
    }
    }
    

var animatePress= currentColor =>{
    //adding and removing the class to make a transition
    $("#"+currentColor).addClass("pressed");

    setTimeout( ()=> {
        $("#"+currentColor).removeClass("pressed");
    },100);
}

var gameOver= () =>{

    gameRunning=false;
    level=0;                    // reset game
    gamePattern=[];
    userClickedPattern=[];
    if(!isMute)
    wrongAudio.play();
    animateGameOver();
}

var animateGameOver= () =>{
    $("#highscore").html("Current Highscore :"+ highscore);
    $("h2").html(" -> <a onclick=\"startGame()\">Restart</a> <- ");
    $("h2").css("color", "red");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
}

var mute=()=>{
    console.log("clicked");
    if(!isMute)
    {
        isMute=true;
        $("#mute-button").attr("src","assets/volume-mute.png");
    }
    else{
        isMute=false;
        $("#mute-button").attr("src","assets/volume-on.png");
    }
    
}









