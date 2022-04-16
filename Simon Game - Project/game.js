var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];
var userClickPattern = [];

var isGameStarted = false;
var level = 0;

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickPattern.length - 1);
  console.log(userClickPattern);
});

$(document).keypress(function() {
  if (!isGameStarted) {
    $("#level-title").text("Level" + level);
    nextSequence();
    isGameStarted = true;
  }
});

// Next Sequence
function nextSequence() {
  userClickPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// Play sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickPattern.length === gamePattern.length)
      setTimeout(function() {
        nextSequence();
      }, 1000);
    console.log("right");
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart.");
    }, 100);
    startOver();
    console.log("wrong");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  isGameStarted = false;
}
