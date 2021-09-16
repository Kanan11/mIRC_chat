# mIRC_chat
Chat app powered by Express 

Server körs på port: 3037.
Server fil heter index.js.
Klient-kod ligger i public mappen.

På vår klientsida har vi använt oss av Bootstrap och JQuery.

1. Installera express och socket.io. "npm install express" & "npm install socket.io".
2. För att köra igång skriver vi "npm start" eller "node index.js" och går till http://localhost:3037 i webbläsaren.
3. För att kunna chatta med flera fönster mot varandra. Så öppnar vi localhost 3037 i flera separata fönster. 
4. Anger ett namn, skriver ett meddelande och skickar.

Varje användare får en separat färg som hämtas ifrån Bootstrap.
När någon lämnar chatten så ser man det i ett meddelande.
När någon skriver ett meddelande så visas det "User is typing" under chatten.

i message input fältet om skriver "/" om man välja "/quote" då kan hämta API text 