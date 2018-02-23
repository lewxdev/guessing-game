// Constant values
var t = 1800, // Chat interval (ms)
    value = [ // Gamemode values
        100, 1000, 10000, 100000
    ],
    constScript = [ // Scripted responses sans concatenation
        // Introduction script
        ['Hey, let\'s play a simple game.',
         'I\'m thinking of a number between 1 and 100.',
         'Can you guess what it is?'],
        // Responses to invalid outputs
        ['Come on, just give it a shot.',
         'I\'m not an idiot you know.',
         'Really?',
         'It\'s fun, I promise.',
         'Stop messing around already!',
         'No wonder we\'re not getting anywhere.',
         'Ha! Yeah, you\'d think so.',
         'Come again?',
         'Who do you take me for?',
         'My dude, just pick a number.',
         'It\'s not rocket science.',
         'Huh?',
         'I mean, I guess you\'re just not that fun then.'],
        // Premise for gamemode 
        ['Let\'s switch things up a bit.',
         'Type \'medium\' to crank up the heat.',
         'Type \'hard\' if you think you can take it.',
         'Type \'hardcore\' if you\'re Chuck Norris\' reincarnate.',
         'Or, just be square and type \'easy\'.'],
        // 'easy' gamemode response
        ['Fine Mr. Squaredy-pants, I\'ll turn down the heat...',
         'Back to 1 to 100.'],
        // 'medium' gamemode response
        ['Oooh, alright, I\'ll turn up the heat a bit.',
         'Let\'s do 1 to 1000.'],
        // 'hard' gamemode response
        ['Spicyyyy, let\'s try 1 to 10000.'],
        // 'hardcore' gamemode response
        ['Bet, 1 to 100000, GO!']
    ],
// Initialized values
    gamemode = 0, // Gamemodes (Guessing factor via value)
    guesses = 0, // Number of guesses per game
    rounds = 0, // Total number of games played
    game = 0, // Game flag (determines if game is ongoing)
    fun = 0, // 'new' Keyword used
    n = Math.floor(Math.random() * 100) + 1, // Initial random number
// Variables
    guess, // Placeholder for valid userInput
    best, // Placeholder for best score
    scores = []; // Placeholder for all guesses

// Auto-scroll function
function drop() {
    var height = 0;
    $('div p').each(function(){
        height += parseInt($(this).height(), null);
    });
    height += '';
    $('div').animate({scrollTop: height});
}
// Speak function
function speak(who, what, when) {
    setTimeout(function() {
        $('p').last().after(
            $('<p/>')
                .addClass(who)
                .text(what)
        );
        drop();
    }, when);
}
// Dialogue function (cpu only)
function dialogue(line, place) {
    var j = 1;
    for (let i = 0; i < place[line].length; i++) {
        speak('cpu', place[line][i], j*t);
        j++;
    }
}
// userInput function
function userInput(Boolean) {
    $('input').prop('disabled', !Boolean);
}
// Gamemode query end function
function end() {
    fun = 0; // Lol, the fun's over
    game = 1;
}

// - - -

dialogue(0, constScript); // Introduction Dialogue

// On submit function (when enter key is clicked)
$('form').submit(function() {
    if ($('input').val() !== '') {
        var script = [ // Scripted responses w/ concatenation
            ['Aww, come on, we were just getting started.',
             'You played ' + rounds + ' game(s).',
             'Your best score was ' + scores[0] + ' guesses.',
             'Good luck at wasting your time, friend!'],
            ['Whoa! You won, nice!',
             'Guesses: ' + (guesses + 1) + '.',
             'Type \'new\' to play again.',
             'Type \'end\' to stop wasting time.'],
            ['Whoa! You won, nice!',
             'Guesses: ' + (guesses + 1) + '.',
             'Type \'new\' to play again.',
             'Type \'end\' to stop wasting time.',
             'Or switch gamemodes and be super cool.',
             '(Just type the gamemode\'s keyword).']
        ];
        // Gamemode evaluation function
        function evaluateAnd(speak, line) {
            n = Math.floor(Math.random() * value[gamemode]) + 1;
            if (speak === null) {
                dialogue(line,constScript);
            } else if (dialogue === null) {
                speak('cpu',speak,t);
            }
            end();
            guesses = 0;
        }

        speak('user', $('input').val(), null);

        // Keywords
        if ($('input').val() === 'new' && game === 0) { // 'new' Keyword
            guesses = 0; // Number of guesses
            fun = 1; // Notify keyword typed
            if (rounds === 1) {
                dialogue(2, constScript);
            } else {
                n = Math.floor(Math.random() * value[gamemode]) + 1;
                speak('cpu', 'Make me a guess I can\'t refuse',t);
            }
        } else if (($('input').val() === 'new' && game === 1)) {
            speak('cpu','Come on, let\'s finish this game first.',t);
        } else if ($('input').val() === 'end') { // 'end' Keyword
            userInput(false);
            scores.sort(function(a, b) {
                return a - b;
            });
            dialogue(0, script);
        }

        // Error Handling
        else if (isNaN($('input').val()) === true && game === 0 && fun !== 1) {
            speak('cpu', constScript[1][Math.floor(Math.random() * constScript[1].length)], t);
        } else if (isNaN($('input').val()) === true && game !== 0 && fun !== 1) {
            speak('cpu', 'Whoops', t);
        } else if (Number($('input').val()) > value[gamemode] || Number($('input').val()) < 0) {
            speak('cpu', 'My dude, you\'re out of bounds.', t);
        } else if (Number.isInteger(Number($('input').val())) === false && isNaN($('input').val()) === false) {
            speak('cpu', 'Nice try, but that\'s not what I mean.', t);
        } else if (Number.isInteger(Number($('input').val())) === true) {
            game = 1; // Ensure game flag
            guess = Number($('input').val()); // Cache valid guess
            guesses++; // Increment guesses

            // Logic
            if (guess > n) { // Guess is too high
                speak('cpu', 'You aimed too high', t);
            } else if (guess < n) { // Guess is too low
                speak('cpu', 'You aimed too low', t);
            } else { // Guess is on point
                rounds++; // Add to total games played
                game = 0; // End current game
                scores.push(guesses); // Save guess score
                if (rounds > 1) {  // Conditional results
                    dialogue(2, script);
                } else {
                    dialogue(1, script);
                }
            }
        }
        
        if (game === 0 && rounds >= 1) {
            if ($('input').val() === 'easy') {
                if (rounds === 1) {
                    speak('cpu','I\'m sorry Dave, I\'m afraid I can\'t do that',t);
                } else {
                    gamemode = 0;
                    evaluateAnd(null, 3);
                }
            } else if ($('input').val() === 'medium') {
                gamemode = 1;
                evaluateAnd(null, 4);
            } else if ($('input').val() === 'hard') {
                gamemode = 2;
                evaluateAnd(null, 5);
            } else if ($('input').val() === 'hardcore') {
                gamemode = 3;
                evaluateAnd(null, 6);
            }
        }
        $('input').val(''); // Empty input
        return false;
    } else {
        return false;
    }
});