# Advanced Programming Project
## Project Objective
The developed system is a software backend which is aimed at handling games of "Italian Dame" between different users. After being authenticated through a JSON Web Token (JWT), the users can choose between different actions (routes) that will allow them to create games, make moves, quit games etc, ect...<br/>
All users' profiles, as soon as created, are associated with a token credit; this tokens are consumed after starting a game (-0.35 tokens) and moving pawns (-0.015 for each move); once a user has no tokens left, it will be impossible for him/her to interact with the system.
The software provides a default administrator account, which allows to give users new tokens. It is also possible for all players to get information about any game played in the past, in addition to statistics about other users.


## Frameworks, Libraries and Tools
* [Express](https://expressjs.com/)
* [Node.js](https://nodejs.org/en/)
* [Sequelize](https://sequelize.org/)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Postman](https://www.postman.com/company/about-postman/)
* [XAMPP](https://www.apachefriends.org/)
