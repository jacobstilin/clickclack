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


    
   


function diceRoller(sides, diceAmmount) {

    let rollTotal = 0;

    for (let i = 1; i <= diceAmmount; i++) {
        let roll = (Math.floor(Math.random() * (sides)) + 1);
        rollTotal += roll;
    }
    return rollTotal;
}


function doublesCheck(firstRoll, secondRoll) {  // Function that determines whether the roll is doubles or not 
    
    if (firstRoll == secondRoll) {
        return true;
    }
    else {
        return false;
    }
}

function snakesCheck(firstRoll, secondRoll) {
    if (firstRoll == 1 && secondRoll == 1) {
        return true;
    }
    else {
        return false;
    }
}

function sixesCheck(firstRoll, secondRoll) {
    if (firstRoll == 6 && secondRoll == 6) {
        return true;
    }
    else {
        return false;
    }
}



// console.log(diceRoller(6, 2));

/* This function takes the number of sides per dice and the amount of dice being rolled and returns the total roll. This will most likely be used for the rest of the program, as this is all we need to know to
    determine values such as snake eyes, sixes, sevens, all that. 
    */




function rollsUntilBust(bustRoll){

    let roundAdjust = Math.floor(Math.random() * 4);

    if (bustRoll < 5) {
        bustRoll = 5;
    }
    if (bustRoll > 17) {
        bustRoll = 17;
    }
        
    let actualRounds = bustRoll + roundAdjust;
    console.log("Actual rounds: " + actualRounds);
    return actualRounds;
}

function roundsRoll(bustRoll){

    if (bustRoll < 5) {
        bustRoll = 5;
    }
    if (bustRoll > 17) {
        bustRoll = 17;
    }

    return bustRoll;
}

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
        alert("Whatchu know about seven?");
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

/* This function determines how many rounds the player has until the game gets bussed down and ends. They roll a twenty sided die to see at least how many rounds they have. To keep the game fun, it will always
    last at least five rounds. Also, the roll will have up to three extra rounds added to it so the player can play risky once they reach the last round of the roll. 
    */


/* So I'm going to have to make the main game function at some point. This will be a function with a bunch of functions stuck inside it. It will have to determine a bunch of 
    */

/* Round structure. Let's get down to brass tacks. We have to make sure the player can realisitically make it through a bunch of rounds without being eliminated too often. The elimination does not have to be too 
    punishing though, most likely just take off some points and end the game. 
    First the player will roll two six sided dice. If they snake eyes or double sixes, they are eliminated. If they roll seven, they are given another free roll. If they roll three sevens in a row, a message will
    pop up and say "what do you know about seven" and they will have to roll a twelve sided die to see if they can continue. If they roll doubles, they will roll a die that has sides equal to that roll (double 2
    equals 4 so a four sided die) and multiply that score by the doubles they rolled. 
    */

//Master Function//

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

runGame();



