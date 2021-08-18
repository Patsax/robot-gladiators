// Games States
// "WIN" - Player robot has defeated all enemy robots
//  *Fight all enemy robots
//  *Defeat all enemy robots
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth, playerMoney);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function (enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt(
      "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
    );

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      //confirm player wants to skip fight
      var confirmSkip = window.confirm("Are you sure you want to quit?");

      //if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + " has chosen to skip this fight. Goodbye!");
        //subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney);
        break;
      }
    }

    // Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable
    enemyHealth = enemyHealth - playerAttack;
    console.log(
      playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has been destroyed!");

      // award player money for winning
      playerMoney = playerMoney + 20;

      //leave while() loop since enemy is destroyed
      break;
    } else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that reult to update the value in the 'playerHealth' variable
    playerHealth = playerHealth - enemyAttack;
    console.log(
      enemyName +
        " attacked " +
        playerName +
        ". " +
        playerName +
        " now has " +
        playerHealth +
        " health remaining."
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has been destroyed!");
      //leave while() loop if player is dead
      break;
    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  }
};

// function to start the game
var startGame = function () {
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    
  for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      var pickedEnemyName = enemyNames[i];

      enemyHealth = 50;

      fight(pickedEnemyName);

      // if player robot is still alive and we're not at the last enemy in the array
      if (playerHealth > 0 && i < enemyNames.length - 1) {
        var storeConfirm = window.confirm("The fight is over. Visit the store before the next round?")
        // if yes, take them to the store() function
        if (storeConfirm) {
        shop();
        }
      }

    } else {
      window.alert("Your robot has been defeated in battle! Game Over!");
      break;
    }
  }

  // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

// function to end the entire game
var endGame = function() {
  // if player is still alive, player wins!
  if (playerHealth > 0) {
    window.alert("Great job, your robot survived the game! You now have a score of " + playerMoney + ".");
  } else {
    window.alert("You've lost your robot in battle.");
  }

  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    //restart game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL " + playerName + "'s health, UPGRADE " + playerName + "'s attack, or LEAVE the store? Please enter: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );
  // use switch to carry out action
  switch (shopOptionPrompt) {
    case "REFILL":
    case "refill":
      if (playerMoney >= 7) {
      window.alert("Refilling " + playerName + "'s health by 20 for 7 dollars.");

      // increase health and decrease money
      playerHealth = playerHealth + 20;
      playerMoney = playerMoney -7;
      } else {
        window.alert("You don't have enough!");
      }
      break;

    case "UPGRADE":
    case "upgrade":
      if (playerMoney >= 7) {
      window.alert("Upgrading " + playerName + "'s attack by 6 for 7 dollars.");

      // increase attack and dcrease money
      playerAttack = playerAttack + 6;
      playerMoney = playerMoney - 7;
      } else {
        window.alert("You don't have enoght money!");
      }
      break;

    case "LEAVE":
    case "leave":
      window.alert("Leaving the store.");

      // do nothing, so function will end
      break;

    default:
      window.alert("You did not pick a valid option. Try again.");

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

startGame();