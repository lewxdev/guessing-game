$(document).ready(function() {
    // Initialized values
    var guesses = 0; // Number of guesses
    var n = Math.floor(Math.random() * 100) + 1; // Random number (1-100)
    $('.userInput').prop('disabled', true); // Disable input
    // Constant values
    var t = 1800; // Chat interval
    var invalid = [ // Invalid: responses
        'Come on, just give it a shot.',
        'I\'m not an idiot you know',
        'Really?',
        'It\'s fun, I promise',
        'Stop messing around already',
        'No wonder we\'re not getting anywhere',
        'Ha! Yeah, you\'d think so.',
        'Come again?',
        'Who do you take me for??'
    ];
    // Variables
    var guess; // Placeholder for valid userInput
    
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
        n = Math.floor(Math.random() * 100) + 1; // Random number (1-100)
    }
    
    // CPU Speak
    setTimeout(function() {
        // Line 1
        $('p').last().after(
            $('<p/>')
                .addClass('cpu')
                .text('I\'m thinking of a number between 1 and 100...')
        );
        setTimeout(function() {
            // Line 2
            $('p').last().after(
                $('<p/>')
                    .addClass('cpu')
                    .text('Can you guess what it is?')
            );
            $('.userInput').prop('disabled', false); // Enable input
        }, t);
    }, t);
    
    // On submit function (when enter key is clicked)
    $('.form').submit(function() {
        $('.userInput').prop('disabled', true); // Disable input
        $('p').last().after(
            $('<p/>')
                .addClass('user')
                .text($('.userInput').val()) // Cache userInput
        );
        drop();
        
        // Keywords (e.g. 'new')
        if ($('.userInput').val() === 'new') {
            // Reinitialize values
            initialize();
            setTimeout(function() {
                    // CPU Line 3
                    $('p').last().after(
                    $('<p/>')
                        .addClass('cpu')
                        .text('Make me a guess I can\'t refuse')
                    );
                drop();
                $('.userInput').prop('disabled', false); // Enable input
            }, t/2);
        }
        
        // Error Handling
        if (isNaN($('.userInput').val()) == true && $('.userInput').val() !== 'new') {
            setTimeout(function() {
                // CPU Line 'Invalid'
                $('p').last().after(
                $('<p/>')
                    .addClass('cpu')
                    .text(invalid[Math.floor(Math.random() * invalid.length)])
                );
                drop();
                $('.userInput').prop('disabled', false); // Enable input
            }, t);
        // No error, so continue with logic
        } else {
            // Cache valid guess
            guess = Number($('.userInput').val());
            // Increment guesses
            guesses++;
            
            // Logic
            // Guess is too high
            if (guess > n) {
                setTimeout(function() {
                    // CPU Line 4
                    $('p').last().after(
                    $('<p/>')
                        .addClass('cpu')
                        .text('You aimed too high')
                    );
                    drop();
                    $('.userInput').prop('disabled', false); // Enable input
                }, t/2);
            // Guess is too low
            } else if (guess < n) {
                setTimeout(function() {
                    // CPU Line 5
                    $('p').last().after(
                    $('<p/>')
                        .addClass('cpu')
                        .text('You aimed too low')
                    );
                    drop();
                    $('.userInput').prop('disabled', false); // Enable input
                }, t/2);
            // Guess is on point
            } else if (guess === n) {
                setTimeout(function() {
                    // CPU Line 6
                    $('p').last().after(
                    $('<p/>')
                        .addClass('cpu')
                        .text('Whoa! You won, nice!')
                    );
                    drop();
                }, t/2);
                
                // Results
                setTimeout(function() {
                    // CPU Line 7
                    $('p').last().after(
                    $('<p/>')
                        .addClass('cpu')
                        .text('Guesses: ' + guesses)
                    );
                    drop();
                    
                    setTimeout(function() {
                        // CPU Line 8
                        $('p').last().after(
                        $('<p/>')
                            .addClass('cpu')
                            .text('Type \'new\' to play again')
                        );
                        drop();
                        $('.userInput').prop('disabled', false); // Enable input
                    }, t);
                }, t);
            }
        }
        
        $('.userInput').val(''); // Empty input
        return false;
    });
});