// Make Dice Functions
function generateDiceImage(randomNumber) {
  return "images/dice" + randomNumber + ".png";
}

function generateDiceNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

// Execute Dice Display
var randomNumber1 = generateDiceNumber();
var randomNumber2 = generateDiceNumber();

var randomImage1 = generateDiceImage(randomNumber1);
var randomImage2 = generateDiceImage(randomNumber2);

var image1 = document.querySelectorAll("img")[0];
var image2 = document.querySelectorAll("img")[1];
image1.setAttribute("src", randomImage1);
image2.setAttribute("src", randomImage2);

// Determine Winner Functions
function isWinner(randomNumber1, randomNumber2) {
  if(randomNumber1 === randomNumber2) {
    return "Draw";
  } else if (randomNumber1 > randomNumber2) {
    return "🚩Player 1 Wins!";
  } else {
    return "Player 2 Wins!🚩";
  }
}

// Execute Match
var winner = isWinner(randomNumber1, randomNumber2)
document.querySelector("h1").innerHTML = winner;
