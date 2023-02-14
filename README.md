# Advanced Programming Project
## Project Objective
The developed system is a software backend which is aimed at handling games of "Italian Dame" between different users. After being authenticated through a JSON Web Token (JWT), the users can choose between different actions (routes) that will allow them to create games, make moves, quit games etc, ect...<br/>
All users' profiles, as soon as created, are associated with a token credit; this tokens are consumed after starting a game (-0.35 tokens) and moving pawns (-0.015 for each move); once a user has no tokens left, it will be impossible for him/her to interact with the system.<br/>
The software provides a default administrator account, which allows to give users new tokens. It is also possible for all players to get information about any game played in the past, in addition to statistics about other users.

## Features and Actions
| Role  | Action | Description |
| ------------- | ------------- | ------------- |
| User/Admin  | Create Game  | Create a new game indicating the grid dimension (*which has to be greater than 4*) and the opponent's email. Upon creation 0.35 tokens are withdrawn from user's account. |
| User/Admin  | Move Pawn  | Move a specific pawn in the game you are playing, indicating the different cells that the pawn has to go through (*cells could be more than 1 in case the pawn eliminates different enemy pawns*). |
| User/Admin  | Game State  | Obtain information (*creator and opponent's emails, state, turn, winner and pawns' positions*) about the state of any game (*terminated or not*).  |
| User/Admin  | Quit Game | The user leaves the game he/her is playing in at the moment. This will attribute a win to the opponent and a loss to the user. |
| User/Admin  | Game Moves | Obtain a list (*JSON or CSV*) off all moves done by all pawns in a specific game (*terminated or not*). |
| User/Admin  | Get Ranking | Obtain a list (*ascending or descending*) of all players sorted by their number of wins. |
| User/Admin  | Get Stats | Get statistics (*total games, n° of wins/losses, games won due to abandon/games lost due to abandon, avarage moves to win/lose*) about a specific player. |
| User/Admin  | Token Balance | Allows the user to check how many tokens he/her has left (*This action is the only one which doesn't require the user to have a token balance greater than 0*). |
| Admin  | Set Tokens | The Admin user can set any users' token balance to a certain level. |

## Routes

| Action  | Method | Route |
| ------------- | ------------- | ------------- |
| Create Game | POST | /game |
| Move Pawn | POST | /move |
| Game State | GET | /gameInfo/:id |
| Quit Game | POST | /:id/quit |
| Game Moves | GET | /gameMoves/:id/:format? |
| Get Ranking | GET | /ranking/:order? |
| Get Stats | GET | /stats/:email |
| Token Balance | GET | /tokenBalance |
| Set Tokens | POST | /token  |

## Routes description

In the following section it will be explained in detail how to interact with the system through the routes mentioned above. It is key to understand that all the routes are preceeded by a JWToken authentication head; this means that without one of this tokens the user cannot do any action. The JWT for this project have been generated using https://jwt.io/ (A service which allows to obtain JWT from payload claims and a secret key).<br/>
The secret key used to generate tokens for this project can be found in the .env file; on the website linked above the claims must me indicated as follows:
![alt text](https://github.com/[Alessandrob99]/[AP_project]/Res/[master]/newGame.PNG.jpg?raw=true)


Once the token has been obtained, in order to use the software, it has to be passed in the HTTP Request Authentication head as 'Bearer Token'.

### Create Game
The game is created by passing in the POST request's body a JSON containing the grid dimension and the opponent's email.<br/> 
**For all POST requests is also important to set the 'Content-Type' parameter to 'application/json'**. <br/>The message payload must be formatted like the example below. 




## Frameworks, Libraries and Tools
* [Express](https://expressjs.com/)
* [Node.js](https://nodejs.org/en/)
* [Sequelize](https://sequelize.org/)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Postman](https://www.postman.com/company/about-postman/)
* [XAMPP](https://www.apachefriends.org/)
