	// I varie användare kommer att ha eget random farg
    var min = 1;
    var max = 6;
    var random = Math.floor(Math.random() * (max - min)) + min;

    // Jag använder classer av Bootstrap
    var alertClass;
    switch (random) {
        case 1:
            alertClass = 'secondary';
            break;
        case 2:
            alertClass = 'danger';
            break;
        case 3:
            alertClass = 'success';
            break;
        case 4:
            alertClass = 'warning';
            break;
        case 5:
            alertClass = 'info';
            break;
        case 6:
            alertClass = 'light';
            break;
    }

    // Huvud func
    $(function () {
        // Här vi jobbar med Socket.io
        var socket = io.connect();
        // skaffa variabler
        var $form = $("#messForm");
        var $name = $("#name");
        var $textarea = $("#message");
        var $all_messages = $("#all_mess"); // separat area för alla meddelande
        var typing = false;
        var timeout = undefined;
        var $message = $("#message");

        // Det knap lysnar event
        $form.submit(function (event) {
            // det är liten "life/hack" att stoppa omstart sidan
            event.preventDefault();
            // I socket vi skickar ny meddelande 'send mess',
            // och skickar vår variabler
            socket.emit('send mess', { mess: $textarea.val(), name: $name.val(), className: alertClass });
            // tomma area
            $textarea.val('');
            
            
        });

        // Här vi avvaktar 'add mess', 
        // att lägga till ny meddelande från ny connection
        socket.on('add mess', function (data) {
            // infåga ny meddelande till gemensamma blok
            // han kan se bara sista srivande meddelandena jQuery
            $all_messages.append("<div class='alert alert-" + data.className + "'><b>" + data.name + "</b>: " + data.mess + "</div>");
            var namnet = data.name
            socket.on('display', (data) => {
                //console.log(data.name)
                if (data.typing == true)
                //console.log(namnet),
                $('.typing').text(`${namnet} is typing...`)
                
                else
                        $('.typing').text("")
                    })
       
       
       
                });
        
        $('#message').keypress((event) => {
            console.log('...')
            if ($("#message").attr("placeholder")) {
                if (event.which != 11) {
                    //console.log('IF')
                    typing = true
                    socket.emit('typing', { message: message, typing: true })
                    clearTimeout(timeout)
                    timeout = setTimeout(typingTimeout, 1000)
                    
                } else {
                    console.log('ELSE')
                    clearTimeout(timeout)
                    typingTimeout()
                    submit()
                }
            }
        })
        
        
                
                
                function typingTimeout() {
                    typing = false
                    socket.emit('typing', { message: message, typing: false })
                    //console.log('typingTimeout')
                }
                
                
                
                
                
                
            });
            //---------------TEST------------------
            var socket = io.connect('http://localhost:3037');
            
            socket.on('message', function(message) {
                console.log('The server has a message for you: ' + message);
            })
            //---------------TEST------------------