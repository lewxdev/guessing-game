$(document).ready(function() {
    
    // Constant values
    var t = 1800; // Chat interval (in miliseconds)
    var value = [ // Gamemode values
        100, 1000, 10000, 100000
    ];
    // Initialized values
    var gamemode = 0; // Gamemodes (Guessing factor)
    var guesses = 0; // Number of guesses per game
    var rounds = 0; // Total number of games played
    var game = 0; // Game flag (determines if game is ongoing)
    // Variables
    var n; // Placeholder for random number
    var guess; // Placeholder for valid userInput
    var scores = []; // Placeholder for all guesses
    // Scripts
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
    var script = [ // CPU speak script
        ['Hey, let\'s play a simple game.',
         'I\'m thinking of a number between 1 and ' + value[gamemode] + '.',
         'Can you guess what it is?'],
        ['Let\'s switch things up a bit.',
         'Type \'medium\' to crank up the heat.',
         'Type \'hard\' if you think you can take it.',
         'Type \'hardcore\' if you\'re Chuck Norris\' reincarnate.',
         'Or, just be square and type \'easy\'.'],
        ['Aww, come on, we were just getting started.',
         'You played ' + rounds + ' games.',
         'Your best score was ' + null + ' guesses.',
         'Good luck at wasting your time, friend!'],
	['Whoa! You won, nice!',
         'Guesses: ' + scores[scores.length - 1] + '.',
	 'Type \'new\' to play again.',
	 'Type \'end\' to stop wasting time.']
    ];
    
    // Auto-scroll function
    function drop() {
        var height = 0;
        $('div p').each(function(i, value){
            height += parseInt($(this).height());
        });

        height += '';

        $('div').animate({scrollTop: height});
    }
    // Initialize function
    function initialize() {
        guesses = 0; // Number of guesses
        n = Math.floor(Math.random() * value[gamemode]) + 1;
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
    // Dialogue function
    function dialogue(who, line) {
        var j = 1;
        for (var i = 0; i < script[line].length; i++) {
            speak(who, script[line][i], j*t);
            j++;
        }
    }
    // userInput function
    function userInput(Boolean) {
        $('.userInput').prop('disabled', !Boolean);
    }
    
    // - - -
    
    // Introduction Dialogue
    initialize();
    dialogue('cpu', 0);
    
    // On submit function (when enter key is clicked)
    $('.form').submit(function() {
        speak('user', $('.userInput').val(), null);
        
        // Keywords (e.g. 'new', 'end')
        if ($('.userInput').val() === 'new' && game === 0) { // 'new' Keyword
            initialize(); // Reinitialize values
            dialogue('cpu', 1);
        } else if ($('.userInput').val() === 'end') { // 'end' Keyword
            userInput(false);
            dialogue('cpu', 2);
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
                game = 0; // End current game
                scores.push(guesses); // Save guess score
                console.log(scores);
                dialogue('cpu', 3); // Results
            }
        }
        
        $('.userInput').val(''); // Empty input
        return false;
    });
});
