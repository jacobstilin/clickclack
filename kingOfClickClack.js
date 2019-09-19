"use strict"

//                  The name of the game is KING OF CLICK CLACK
//  The object of the game is to get a high score and get out before the game is busted and you lose all your winnings. 
//  Player rolls a d20 to determine how many rounds they have before the game is busted. Roll is adjusted for fairness to be no less than five and no more than 17. 
//  Player is randomly given up to three extra rounds before the game is busted but is not shown how many extra rounds have been given. 
//  After each round, player is given the choice to back out with their current score or keep going. If a player chooses to keep going and hits the bust round the game ends and their final score is zero.
//  At the beginning of each round, player rolls two six sided dice. If snake eyes or double sixes are rolled, player is eliminated, the game ends and their final score is equal to half their current score,
//      rounded up.
//  If the player rolls any other doubles they are given a bonus multiplier roll. One die is rolled with sides equal to the previous roll (double twos equals a four sided die) and this roll is multiplied by
//      the round's first roll to get the round's score.
//  If the player rolls a seven, they are given up to three bonus rolls. If they don't roll a seven on the first bonus roll, the round ends and they receive seven points for the round. Two sevens in a row 
//      awards 49 points, three sevens in a row awards 77 points. If the player successfully rolls three sevens, they then roll a single d12 and if they roll a seven their round score is 343 points.
//  If the player does not roll doubles or sevens, the total of the roll is added to their total score and the round ends.
//  The game ends when the player backs out, is eliminated or the game is busted.         




    
   

// This function produces a dice roll. It takes in the sides of the dice and the number of dice rolled and returns a number equal to the sum of all rolls.
function diceRoller(sides, diceAmount) {

    let rollTotal = 0;

    for (let i = 1; i <= diceAmount; i++) {
        let roll = (Math.floor(Math.random() * (sides)) + 1);
        rollTotal += roll;
    }
    return rollTotal;
}

//This function determines whether a roll is doubles. It takes in two roll results and returns a boolean based on if the roll is doubles.
function doublesCheck(firstRoll, secondRoll) {  // Function that determines whether the roll is doubles or not 
    
    if (firstRoll == secondRoll) {
        return true;
    }
    else {
        return false;
    }
}

//This function determines whether a roll is snake eyes. It takes in two roll results and returns a boolean based on if the roll is snakeeyes.
function snakesCheck(firstRoll, secondRoll) {
    if (firstRoll == 1 && secondRoll == 1) {
        return true;
    }
    else {
        return false;
    }
}

//This function determines whether a roll is double sixes. It takes in two roll results and returns a boolean based on if the roll is double sixes.
function sixesCheck(firstRoll, secondRoll) {
    if (firstRoll == 6 && secondRoll == 6) {
        return true;
    }
    else {
        return false;
    }
}

// This function takes the player's initial roll to see how many rounds they have before the game is busted and adjusts it by up to three extra rounds.
function rollsUntilBust(bustRoll){
    let roundAdjust = Math.floor(Math.random() * 4);
    let actualRounds = bustRoll + roundAdjust;
    console.log("Actual rounds: " + actualRounds);
    return actualRounds;
}

// This function takes the player's initial roll to see how many rounds they have before the game is busted and adjusts it to be within a fair range.
function roundsRoll(bustRoll){

    if (bustRoll < 5) {
        bustRoll = 5;
    }
    if (bustRoll > 17) {
        bustRoll = 17;
    }

    return bustRoll;
}

// This function gives a prompt to see whether the player wishes to back out or continue playing. It returns a boolean if they input y or n and gives the prompt again if they try anything else.
function keepGoing() {
    let keepGoingPrompt = prompt("Keep going or back out? y/n");

    if (keepGoingPrompt == "y") {
        return true;
    }
    if (keepGoingPrompt == "n") {
        return false;
    } else {
        return keepGoing();
    }
}

/* This function handles rounds where the player rolls a seven. It allows them to keep rolling for sevens to get bonus points. Custom alerts appear based on how many sevens they roll. The bonus rolls are determined
    at the beginning of the function. Alerts are made and points awarded based on how many sevens in a row the player gets. It then returns the points awarded for that round to the round function.
    */
function seven() {
    let firstRoll = diceRoller(6, 2);
    let secondRoll = diceRoller(6, 2);
    let thirdRoll = diceRoller(12, 1);
    let roundScore = 7;

    console.log(firstRoll);
    console.log(secondRoll);
    console.log(thirdRoll);

    if (firstRoll == 7) {
        alert("Seven again!");
        roundScore = 49;
    } 
    else { alert("You rolled " + firstRoll + ". Dang, better luck next time!");
    return roundScore;
    }

    if (firstRoll == 7 && secondRoll == 7) {
        alert("What y'all know about seven?");
        roundScore = 77;
    }
    else { alert("You rolled " + secondRoll + ". Oof, so close!");
    return roundScore;
    }

    if (firstRoll == 7 && secondRoll == 7 && thirdRoll == 7) {
        alert("Aow he's a seven master");
        roundScore = 343;
    }
    else { alert("You rolled " + thirdRoll + ". Agh, so heartbreaking!");
    return roundScore;
    }
    
}

/* This function serves as a whole round of the game. It starts after the player is told about how many rounds they have before bust. It repeats via the do while loop in the master function until the player is
    eliminated, the player backs out or the game is busted. The function produces a roll of two six sided dice. It informs the player what they rolled. If the player rolls snake eyes or double sixes, the function
    returns a number that indicates to the master function they have done so. If not, the function checks if the player rolls doubles. If so, the player is given a bonus roll. The bonus roll is applied to the intial
    roll and the total points for the round is returned. If the player does not roll doubles or a seven, the sum of the rolls is returned. If the player rolls a seven, the seven function is called and the result of
    the seven function is returned to the master function.
    */
function wholeRound() {
        let firstRoll = diceRoller(6, 1);
        let secondRoll = diceRoller(6, 1);
        let totalRoll = firstRoll + secondRoll;
        let roundScore = 0; 
        let bonusRoll;    
    
        console.log("First roll: " + firstRoll);
        console.log("Second roll: " + secondRoll);
        alert("You rolled a " + firstRoll + " and a " + secondRoll + ".");

        if (snakesCheck(firstRoll, secondRoll) == true) {
            roundScore = -1;
            return roundScore;
        }

        if (sixesCheck(firstRoll, secondRoll) == true) {
            roundScore = -2; 
            return roundScore;
        } 
        
        else if (doublesCheck(firstRoll, secondRoll) == true) {
            console.log(totalRoll + " dubs");
            alert("You rolled doubles! Bonus roll time!")
            bonusRoll = (diceRoller(totalRoll, 1));
            alert("Bonus roll: " + bonusRoll + "!");
            roundScore = (totalRoll * bonusRoll);
            console.log("Round score: " + roundScore);
            alert("You scored " + roundScore + " points this round.");
            return roundScore;
        }

        if (doublesCheck(firstRoll, secondRoll) == false && totalRoll != 7) {
            roundScore = totalRoll;
            console.log(totalRoll + " not dubs");
            console.log("Round score: " + roundScore);
            alert("You scored " + roundScore + " points this round.");
            return roundScore;
        }
        
        if (totalRoll == 7) {
            alert("Seven! Roll again!");
            roundScore = seven();
            console.log("Round score: " + roundScore);
            alert("You scored " + roundScore + " points this round.");
            return roundScore;
        }
}



//Master Function//
/*This function gives the introduction. It then gives the player a d20 roll to see about how many rounds they have before the game is busted. Then the function determines the actual rounds before the game is busted.
    After this, the do while loop begins for each round of the game. If the game is busted, the final score is set to zero and the do while loop is broken. If an elimination occurs, the player's final score is halved
    and the do while loop is broken. Otherwise the do while loop simply adds the round score onto the total score. The do while loop repeats until broken or the player decides to back out. When the game ends, the 
    player's final score is displayed.
    */

function runGame() {
    alert("Welcome to King of Click Clack. The rules are simple: roll until you are satisfied with your score then leave with your winnings. Watch out though, if you are still playing when the game gets busted\
 down the game ends and your score is zero! Snake eyes and double sixes result in elimination, halving your score and ending the game. Any other doubles allow you to roll a score multiplier die. If you roll a\
 seven, you have up to three bonus rolls with which to boost your score.");

    

    let currentScore = 0;
    let roundNumber = 0;
    let roundResult = 0;
    let totalRounds = roundsRoll(diceRoller(20, 1));
    let actualRounds = rollsUntilBust(totalRounds);

    alert("You have about " + totalRounds + " rounds until the cops show up and the game is busted.");

    do {
        roundNumber++;
        alert("Round " + roundNumber);
        console.log("Round " + roundNumber);
        if (roundNumber == actualRounds) {
            alert("Game busted! You win nothing.");
            currentScore = 0;
            break;
        }

        roundResult = wholeRound();
        
        if (roundResult == -1) {
            alert("Snake Eyes! You have been eliminated!");
            if (currentScore % 2 != 0) {
                currentScore -= 1;
            }
            currentScore = (currentScore / 2);
            break;
        }
        if (roundResult == -2) {
            alert("Double Sixes! You have been eliminated!");
            if (currentScore % 2 != 0) {
                currentScore -= 1;
            }
            currentScore = (currentScore / 2);
            break;
        }

        else {
            currentScore += roundResult;
            console.log("Current score: " + currentScore);
            alert("Your total score is: " + currentScore + ".");
        }
        
    } 
    while (keepGoing() == true);
    console.log("Final score: " + currentScore);
    alert("Final Score: " + currentScore);
}





