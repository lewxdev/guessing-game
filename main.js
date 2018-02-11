$(document).ready(function() {
    var n = Math.floor(Math.random() * 100) + 1;
    var t = 1800;
    var invalid = [
        'Come on, just give it a shot.',
        'I\'m not an idiot you know',
        'Really?',
        'It\'s fun, I promise',
        'Stop messing around already',
        'No wonder we\'re not getting anywhere'
    ];
    var guesses = 0;
    var guess;
    function drop() {
        var height = 0;
        $('div p').each(function(i, value){
            height += parseInt($(this).height());
        });

        height += '';

        $('div').animate({scrollTop: height});
    }
    
    $('.userInput').prop('disabled', true);
    
    setTimeout(function() {
        $('p').last().after(
            $('<p/>')
                .addClass('cpu')
                .text('I\'m thinking of a number...')
        );
    }, t);
    
    setTimeout(function() {
        $('p').last().after(
            $('<p/>')
                .addClass('cpu')
                .text('Can you guess what it is?')
        );
        $('.userInput').prop('disabled', false);
    }, 2*t);
    
    $('.form').submit(function() {
        $('p').last().after(
            $('<p/>')
                .addClass('user')
                .text($('.userInput').val())
        );
        
        if (isNaN($('.userInput').val()) == true) {
            setTimeout(function() {
                $('p').last().after(
                $('<p/>')
                    .addClass('cpu')
                    .text(invalid[Math.floor(Math.random() * invalid.length)])
                );
                drop();
            }, t);
        } else {
            guess = Number($('.userInput').val());
            guesses++;
            if (guess > n) {
                
                setTimeout(function() {
                    $('p').last().after(
                    $('<p/>')
                        .addClass('cpu')
                        .text('You aimed too high')
                    );
                    drop();
                }, t/2);
            } else if (guess < n) {
                setTimeout(function() {
                    $('p').last().after(
                    $('<p/>')
                        .addClass('cpu')
                        .text('You aimed too low')
                    );
                    drop();
                }, t/2);
            } else {
                setTimeout(function() {
                    $('p').last().after(
                    $('<p/>')
                        .addClass('cpu')
                        .text('Whoa! You won, nice!')
                    );
                    drop();
                }, t/2);
            }
        }
        
        $('.userInput').val('');
        drop();
        return false;
    });
});