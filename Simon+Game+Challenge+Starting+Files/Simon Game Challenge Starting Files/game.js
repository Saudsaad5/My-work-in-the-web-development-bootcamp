// Array holding the colors used in the game
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to store the randomly generated game pattern
var gamePattern = [];

// Array to store the pattern of colors clicked by the user
var userClickedPattern = [];

// Boolean variable to track if the game has started
var started = false;

// Variable to track the current level of the game
var level = 0;

// Event listener for a key press to start the game
$(document).keypress(function() {
  if (!started) {
    // Display the initial level when the game starts
    $("#level-title").text("Level " + level);
    // Call the function to generate the next sequence
    nextSequence();
    // Set the game as started
    started = true;
  }
});

// Event listener for when a user clicks on a button
$(".btn").click(function() {
  // Get the ID of the clicked button (color) and store it in userChosenColour
  var userChosenColour = $(this).attr("id");
  // Add the clicked color to the user's pattern
  userClickedPattern.push(userChosenColour);

  // Play the sound corresponding to the clicked color
  playSound(userChosenColour);
  // Animate the button press
  animatePress(userChosenColour);

  // Check the user's answer against the game pattern
  checkAnswer(userClickedPattern.length - 1);
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
  // Check if the current color in the user's pattern matches the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // If the user has finished the sequence correctly, generate the next sequence
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");

    // Play the "wrong" sound if the user made a mistake
    playSound("wrong");

    // Add the "game-over" class to the body and remove it after 200ms
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Display the game over message
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Restart the game by resetting variables
    startOver();
  }
}

// Function to generate the next sequence in the game pattern
function nextSequence() {
  // Reset the user's clicked pattern for the new level
  userClickedPattern = [];
  // Increase the level by 1
  level++;
  // Update the level title with the new level number
  $("#level-title").text("Level " + level);

  // Generate a random number between 0 and 3 to select a color
  var randomNumber = Math.floor(Math.random() * 4);
  // Select a random color based on the random number
  var randomChosenColour = buttonColours[randomNumber];
  // Add the chosen color to the game pattern
  gamePattern.push(randomChosenColour);

  // Animate the button of the chosen color by flashing it
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // Play the sound corresponding to the chosen color
  playSound(randomChosenColour);
}

// Function to play the sound for a given color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to animate the button press by adding and removing the "pressed" class
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to reset the game variables when the game is over
function startOver() {
  // Reset the level to 0
  level = 0;
  // Clear the game pattern
  gamePattern = [];
  // Set the game to not started
  started = false;
}
