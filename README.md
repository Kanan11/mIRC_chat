# mIRC_chat
Chat app powered by Express 
https://github.com/Kanan11/mIRC_chat

Server körs på port: 3037.
Server fil heter index.js.
Klient-kod ligger i public mappen.

På vår klientsida har vi använt oss av Bootstrap och JQuery.

1. Installera express och socket.io. "npm install"
2. För att köra igång skriver vi "npm start" eller "nodemon index.js" och öppna http://localhost:3037 i webbläsaren.
3. För att kunna chatta med flera fönster mot varandra. Så öppnar vi localhost med 3037 port i flera separata fönster. 
4. Anger ett namn, skriver ett meddelande och tryck på "SKICKA" knappen.
5. I message input fältet om man skriver "/" och trycker på "/quote" då hämtas API text 

Varje användare får en separat färg som hämtas ifrån Bootstrap.
När någon ansluter eller lämnar chatten så ser man det i ett meddelande.
När någon skriver ett meddelande så visas det "User is typing" under chatten inom 1,5 sec timeout.
