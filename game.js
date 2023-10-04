// Replaced 'var' with 'let' and 'const' for variable declarations.
const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Added comments to describe the purpose of the event listener.
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Added comments to describe the purpose of the event listener.
$(".btn").click(function() {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Added comments to describe the purpose of the checkAnswer function.
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    wrongFeedback();
    startOver();
  }
}

// Added comments to describe the purpose of the nextSequence function.
function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

// Added comments to describe the purpose of the playSound function.
function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Added comments to describe the purpose of the animatePress function.
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Added comments to describe the purpose of the wrongFeedback function.
function wrongFeedback() {
  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press any Key to Restart");
}

// Added comments to describe the purpose of the startOver function.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
