$(document).ready(function() {
    
    // Constant values
    var t = 1800; // Chat interval (in miliseconds)
    var value = [ // Gamemode values
        100, 1000, 10000, 100000
    ];
    var invalid = [ // Responses to invalid outputs
        'Come on, just give it a shot.',
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
        'I mean, I guess you\'re just not that fun then.'
    ];
    // Initialized values
    var gamemode = 0; // Gamemodes (Guessing factor)
    var guesses = 0; // Number of guesses per game
    var rounds = 0; // Total number of games played
    var game = 0; // Game flag (determines if game is ongoing)
    var fun = 0; // 'new' Keyword used
    // Variables
    var n; // Placeholder for random number
    var guess; // Placeholder for valid userInput
    var best; // Placeholder for best score
    var scores = []; // Placeholder for all guesses
    
    // Auto-scroll function
    function drop() {
        var height = 0;
        $('div p').each(function(i, value){
            height += parseInt($(this).height());
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
    // userInput function
    function userInput(Boolean) {
        $('.userInput').prop('disabled', !Boolean);
    }
    // Gamemode query end function
    function end() {
        fun = 0; // Lol, the fun's over
        game = 1;
    }
    
    // - - -
    
    // Introduction Dialogue
    guesses = 0; // Number of guesses
    n = Math.floor(Math.random() * value[gamemode]) + 1;
    speak('cpu', 'Hey, let\'s play a simple game.', t);
    speak('cpu', 'I\'m thinking of a number between 1 and 100.', 2*t);
    speak('cpu', 'Can you guess what it is?', 3*t);
    
    // On submit function (when enter key is clicked)
    $('.form').submit(function() {
        // Dialogue function
        function dialogue(who, line) {
            var j = 1;
            for (var i = 0; i < script[line].length; i++) {
                speak(who, script[line][i], j*t);
                j++;
            }
        }
        var script = [ // CPU speak script
            ['Let\'s switch things up a bit.',
             'Type \'medium\' to crank up the heat.',
             'Type \'hard\' if you think you can take it.',
             'Type \'hardcore\' if you\'re Chuck Norris\' reincarnate.',
             'Or, just be square and type \'easy\'.'],
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
             '(Or switch gamemodes and be super cool)']
        ];
        
        speak('user', $('.userInput').val(), null);
        
        if (fun === 1) {
            if ($('.userInput').val() === 'easy') {
                speak('cpu','Try something new, will ya?',t);
            } else if ($('.userInput').val() === 'medium') {
                gamemode = 1;
                n = Math.floor(Math.random() * value[gamemode]) + 1;
                speak('cpu','Ooooh, alright, how about 1 to ' + value[gamemode] + '.',t);
                end();
            } else if ($('.userInput').val() === 'hard') {
                gamemode = 2;
                n = Math.floor(Math.random() * value[gamemode]) + 1;
                speak('cpu','Spicy, let\'s try 1 to ' + value[gamemode] + '.',t);
                end();
            } else if ($('.userInput').val() === 'hardcore') {
                gamemode = 3;
                n = Math.floor(Math.random() * value[gamemode]) + 1;
                speak('cpu','Bet, 1 to ' + value[gamemode] + ', GO!',t)
                end();
            }
        }
        
        if (fun === 0) {
            // Keywords
            if ($('.userInput').val() === 'new' && game === 0) { // 'new' Keyword
                guesses = 0; // Number of guesses
                fun = 1; // Notify keyword typed
                if (rounds === 1) {
                    dialogue('cpu', 0);
                } else {
                    speak('cpu', 'Make me a guess I can\'t refuse',t);
                }
            } else if (($('.userInput').val() === 'new' && game === 1)) {
                speak('cpu','Come on, let\'s finish this game first.',t);
            } else if ($('.userInput').val() === 'end') { // 'end' Keyword
                userInput(false);
                scores.sort(function(a, b) {
                    return a - b;
                });
                dialogue('cpu', 1);
            }

            // Error Handling
            else if (isNaN($('.userInput').val()) === true && game === 0) {
                speak('cpu', invalid[Math.floor(Math.random() * invalid.length)], t);
            } else if (isNaN($('.userInput').val()) === true && game !== 0) {
                speak('cpu', 'Whoops', t);
            } else {
                game = 1; // Ensure game flag
                guess = Number($('.userInput').val()); // Cache valid guess
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
                        dialogue('cpu', 3);
                    } else {
                        dialogue('cpu', 2);
                    }
                }
            }
        }
        
        $('.userInput').val(''); // Empty input
        return false;
    });
});