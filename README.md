# Messanger_App_Back
<li><a href='#General-Info'>General Info</a></li>
<li><a href='#Tech-Stack'>Tech Stack</a></li>
<li><a href='#What was acomplished...'>What was acomplished...</a></li>
<li><a href='#and-what-wasnt'>...and what wasn't</a></li>

![Bez tytułu](https://github.com/DominikDO98/Messanger_App_Back/assets/123335551/f9f0d7e9-11b8-45fd-b163-f8da005b417e)
![Bez tytułu2](https://github.com/DominikDO98/Messanger_App_Back/assets/123335551/784678dd-88b5-4034-83ed-29ce4183de88)
![Bez tytułu3](https://github.com/DominikDO98/Messanger_App_Back/assets/123335551/d61dc739-a640-464a-bb57-1d902affccfc)

## General Info:
JS Application which allows it's users to send messages between each other via websocekt connection.
The point of the project was to practice web-application develoment with kown tools such as React.js, Express.js, SQL Databases and expanding kowlagde into new territories though introduction into websocets and jwt authetication.

# Tech Stack:

<li>React.js</li>
<li>Express.js</li>
<li>Typescript</li>
<li>WebSocket</li>
<li>JWT</li>
<li>MariaDB</li>

# What was acomplished...
Procject acomplished creating fully working, responsive chat application.
Application implements Login and Registration functionalities with hashed passwords being stored in database, authorization middleware protecting backend routes, basic error-handling, websockets connection established between frontend, backend and other users. Users can create group chats or private rooms between each other. All users converstions are loaded from database upon login and choosing type of the chats (private or group). All chat messages are stored in DB and send to user when they select chat-room from inbox.

# ...and what wasnt
Unfortunetly, as of right now, application is in unpolished state. Things which was planned, but due to lack of time wasn't implemanted or require more work:  better error handling and validation hanlding, creating handle-error middleware, tests, better user-expiriance, deployment on the server, routing on frontend
<br/>
Frontend: https://github.com/DominikDO98/Messanger_App_Front
