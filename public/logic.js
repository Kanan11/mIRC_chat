let namnet = "";

// I varie användare kommer att ha eget random farg
var min = 1;
var max = 6;
var random = Math.floor(Math.random() * (max - min)) + min;

// Jag använder classer av Bootstrap
var alertClass;
switch (random) {
  case 1:
    alertClass = "secondary";
    break;
  case 2:
    alertClass = "danger";
    break;
  case 3:
    alertClass = "success";
    break;
  case 4:
    alertClass = "warning";
    break;
  case 5:
    alertClass = "info";
    break;
  case 6:
    alertClass = "light";
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

  // Det knap skickar event
  $form.submit(function (event) {
    // det är liten "life/hack" att stoppa omstart sidan
    event.preventDefault();
    // I socket vi skickar ny meddelande 'send mess',
    // och skickar vår variabler
    socket.emit("send mess", {
      mess: $textarea.val(),
      name: namnet,
      className: alertClass,
    });
    namnet = $name.val(); // Fixad
    // tomma area
    $textarea.val("");
  });

  // Här vi avvaktar 'add mess',
  // att lägga till ny meddelande från ny connection
  socket.on("add mess", function (data) {
    // infåga ny meddelande till gemensamma blok
    // han kan se bara sista srivande meddelandena jQuery
    if (data.mess === "") {
      return null
    } else {

      $all_messages.append(
        "<div class='alert alert-" +
        data.className +
        "'><b>" +
        data.name +
        "</b>: " +
        data.mess +
        "</div>"
      );
    }

    //ta mot info om nån skriver
    socket.on("display", (data) => {
      if (data.typing == true)
        $(".typing").text(`${data.name} is typing...`);
      else $(".typing").text("");
    });


    const userName = data.name;
    if (userName) {
      socket.emit("new-user", userName);
    } else {
      null;
    }
  });

  $name.keypress((event) => {
    namnet = $name.val();
  });
  //jQuery hälper oss
  $("#message").keypress((event) => {
    console.log("...");
    if ($("#message").attr("placeholder")) {
      if (event.which != 11) {
        typing = true;
        namnet = $name.val();
        socket.emit("typing", { name: namnet, typing: true });
        clearTimeout(timeout);
        timeout = setTimeout(typingTimeout, 1500);
      } else {
        console.log("ELSE");
        clearTimeout(timeout);
        typingTimeout();

      }
    }
  });

  function typingTimeout() {
    typing = false;
    socket.emit("typing", { name: namnet, typing: false });
  }

  socket.on("user-connected", userName => {
    if ((userName === namnet) && typing) {
      console.log('oldUser')

      $(".join").text("");
    }
    else {


      const d = new Date();
      $(".join").text(`${userName}` + " has connected " + d.toDateString());
    }
  });

  socket.on("user-disconnected", (userName) => {
    $(".join").text(`${userName}` + " has left ");
  });


  // det API func som integrerar med 3-part sys
  btn.addEventListener('click', function () {
    if (message.value == "/quote") {
      async function command() {

        const quoteList = await fetch("https://type.fit/api/quotes")
        const oneQoute = await quoteList.json()

        var item = oneQoute[Math.floor(Math.random() * oneQoute.length)];

        console.log(item.text),
          console.log(namnet),
          console.log(alertClass),

          //---------------------------- 
          socket.emit("send mess", { mess: item.text, name: namnet, className: alertClass });
        //---------------------------- 


      }
      command();
      message.value = "";
    } else {

      //reserverade plats för GIF

    }
  });

});
function check() {

  if (message.value == '/') {
    const quote = document.getElementById('quote')
    quote.style.display = 'block'
    quote.onclick = function () {
      const inputText = document.getElementById('message')
      inputText.value = '/quote'
      quote.style.display = 'none'
    }
  } else {
    quote.style.display = 'none'
  }
};
btn = document.getElementById('send')