var arr = ["red","blue","green","yellow"];
var arr2 = []
var userChosenColor = []
var gameOver = false;


$(".btn").click(function(){
    var color = $(this).attr("id");
    userChosenColor.push(color);
    playSound(color);
    animatePress(color);
    check(userChosenColor.length-1);
})

var started = false;
var level = 0;

$(document).keypress(function(){
    if(started == false){
        setTimeout(function(){
            nextSequence();
        },500);
        started = true;
        }
})



function nextSequence(){
    userChosenColor=[]
    level++; 

    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var color = arr[randomNumber];
    arr2.push(color);

    //Adding animation on loading
    $("#"+color).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);
}

//animate the clicking of the element
function animatePress(c){
    //added class pressed to the color on click
    $("#"+c).addClass("pressed")

    //after delay of 10 millisecond removed the color on click
    setTimeout(function(){
        $("#"+c).removeClass("pressed");}
        ,10)
}

//playing sound on click using this function
function playSound(c){
    var audio = new Audio("sounds/"+c+".mp3")
    audio.play();
}

function check(num){
    if(arr2[num]===userChosenColor[num]){
        console.log("success");
        if(arr2.length===userChosenColor.length){
            setTimeout(function(){
                nextSequence()}
                ,1000);
        }
    }else{
        wrong();
        started=false;
    }
}

function wrong(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over,Press any key to continue");
    playSound("wrong");
    level=0;
    arr2=[]
}
