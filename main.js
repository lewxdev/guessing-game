var answer = Math.floor(Math.random() * 100) + 1;
var guess;

console.log(answer);

while (guess != answer) {
    guess = prompt("Make a guess, my dude");
    
    if (guess > answer) {
        alert("Guess lower, boi");
    } else if (guess < answer) {
        alert("Aim higher");
    } else {
        alert("You WON!");
    }
}