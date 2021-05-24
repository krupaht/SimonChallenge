var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
console.log();
$(document).on("keydown", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  console.log("current level --> " + currentLevel);
  console.log(
    "userClicked array--> " +
      userClickedPattern +
      " --- " +
      userClickedPattern[currentLevel] +
      " --- " +
      userClickedPattern.length
  );
  console.log(
    "Game Patter array --> " +
      gamePattern +
      " --- " +
      gamePattern[currentLevel] +
      " --- " +
      gamePattern.length
  );
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 1000);

    startOver();
  }
}
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeToggle()
    .fadeToggle();

  playSound(randomChosenColor);
}
function playSound(name) {
  var pl = new Audio("sounds/" + name + ".mp3");
  pl.play();
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
