# Messanger_App_Back

<h3>General Info:</h3>
JS Application that's allows it's users to send messages between each other via websocekt connection.
The point of the project was to practice web-application develoment with kown tools such as React.js, Express.js, SQL Databases and expanding kowlagde into new territories though introduction into websocets and jwt authetication.

<h3>Tech Stack:</h3>

<li>React.js</li>
<li>Express.js</li>
<li>Typescript</li>
<li>WebSocket</li>
<li>JWT</li>
<li>MariaDB</li>

<h3>What was acomplished...</h3>
Procject acomplished creating fully working, resonsive chat application.
Application implements Login and Registration functionalities with hashed passwords being stored in database, authorization middleware protecting backend routes, basic error-handling, websockets connection established between frontend, backend and diffrent users. Users can create group chats or private rooms between each other. All users converstions are loaded from database upon login and choosing type of the chats (private or group). All chat messages are stored in DB and send to user when they select chat-room from inbox.

<h3>...and what not</h3>
Unfortunetly, as of right now, application is in unpolished state. Things which was planned, but due to lack of time wasn't implemanted or require more work:  better error handling and validation hanlding, creating handle-error middleware, tests, better user-expiriance. 
