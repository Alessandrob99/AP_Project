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

In the following section it will be explained in detail how to interact with the system through the routes mentioned above. It is crucial to understand that all the routes are preceeded by a JWToken authentication head; this means that without one of this tokens the user cannot do any action. The JWT for this project have been generated using https://jwt.io/ (A service which allows to obtain JWT from payload claims and a secret key).<br/>
The secret key used to generate tokens for this project can be found in the .env file; on the website linked above the claims must me indicated as follows:
<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218695257-0c72f1e1-51b5-4b1f-a073-637d12e49408.PNG" width="800" />
</p>

Once the token has been obtained, in order to use the software, it has to be passed in the HTTP Request Authentication head as 'Bearer Token'.

### Create Game
The game is created by passing in the POST request's body a JSON containing the grid dimension and the opponent's email.<br/> 
**For all POST requests is also important to set the 'Content-Type' parameter to 'application/json'**. <br/>The message payload must be formatted like the example below. <br/>
<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218695586-a0e4c22a-e8b3-4c63-8575-94de43026a5d.PNG" />
</p>

### Move Pawn
This route allows the user to move a pawn in the game he/her is playing (*if the user is not in game an error is returned*) by indicating the array of moves that the pawn has to do in order to reach its final destination. All moves done by the pawn are verified and if some of them violate one or more game rules an error is returned.<br/> the game creator always controlls the white pawns while the opponent has the black ones. Pawn names are always composed by two parts: ('w'/'b') + (pawn number from creator's left to his right); for example the black pawn to the far left (*from the creator point of view*) is named b1.
<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218702195-3b911a2a-bafd-4df8-bd75-9be6f77c8361.PNG" />
</p>

### Game State
As said above this route allows the user to obtain general informaion about a specific game, which is indicated by an id parameter passed by query string. In the example below we are retriving information about the game identified by id 20.
<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218703561-d6e5dcc4-7014-4036-8e45-d3ad35a296f0.PNG" />
</p>

### Quit Game
If the user is currently playing in a game, the latter will be terminated, a loss will be given to the user and a win is attributed to the opponent. If the user is not playing any game an error is returned.

### Game Moves
As for the game state route, here the game id is passed through query string in the request URL; in addition to this, if the user indicates as second parameter 'csv', the moves list is returned as a csv string.
<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218706823-19b08eb8-f71f-4f3b-87bb-469a80bb2507.PNG" />
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218707016-21c7c4fa-96ef-46af-bb8f-a835678427a7.PNG" />
</p>

### Get Ranking
As in the previous cases, the parameters are passed as query string, this time the attribute indicates whether the user wants the list to be sorted in ascending order (*order = 'asc'*) or in descending order (*order = anything else*).
<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218707815-ecee4459-74a6-49ac-8d35-5558ecb3dd93.PNG" />
</p>

### Get Stats
This time the query string parameter is the email of the player whose statistics the user wants to get.
<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218709004-05616d9b-8d09-4c68-8857-91067983a6a1.PNG" />
</p>

### Token Balance
As said before, in order to use this route it's not necessary for the user's credit to be greater than 0.
<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218709668-117ba391-bc23-48a2-bc1b-b2fb756f91d3.PNG" />
</p>

### Set Tokens 
This is the only route accessible exclusively by the administrator; it allows to set the token balance of any player to any amount.
<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218710586-cdf03139-7ff7-4bc2-8cf6-09eb34ba5e98.PNG" />
</p>

## Frameworks, Libraries and Tools
* [Express](https://expressjs.com/)
* [Node.js](https://nodejs.org/en/)
* [Sequelize](https://sequelize.org/)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Postman](https://www.postman.com/company/about-postman/)
* [XAMPP](https://www.apachefriends.org/)
