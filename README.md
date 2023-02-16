# :chess_pawn: Advanced Programming Project 	:crown:
## Project Goal
The developed system is a software backend which is aimed at handling games of "Italian Dame" between different users. After being authenticated through a JSON Web Token (JWT), the users can choose between different actions (routes) that will allow them to create games, make moves, quit games etc, ect...<br/>
All users' profiles, as soon as created, are associated with a token credit; this tokens are consumed after starting a game (-0.35 tokens) and moving pawns (-0.015 for each move); once a user has no tokens left, it will be impossible for him/her to interact with the system.<br/>
The software provides a default administrator account, which allows to give users new tokens. It is also possible for all players to get information about any game played in the past, in addition to statistics about other users.

## Features and Actions
| Role  | Action | Description |
| ------------- | ------------- | ------------- |
| User/Admin  | **Create Game**  | Create a new game indicating the grid dimension (*which has to be greater than 4*) and the opponent's email. Upon creation 0.35 tokens are withdrawn from user's account. |
| User/Admin  | **Move Pawn** | Move a specific pawn in the game you are playing, indicating the different cells that the pawn has to go through (*cells could be more than 1 in case the pawn eliminates different enemy pawns*). |
| User/Admin  | **Game State** | Obtain information (*creator and opponent's emails, state, turn, winner and pawns' positions*) about the state of any game (*terminated or not*).  |
| User/Admin  | **Quit Game** | The user leaves the game he/her is playing in at the moment. This will attribute a win to the opponent and a loss to the user. |
| User/Admin  | **Game Moves** | Obtain a list (*JSON or CSV*) off all moves done by all pawns in a specific game (*terminated or not*). |
| User/Admin  | **Get Ranking** | Obtain a list (*ascending or descending*) of all players sorted by their number of wins. |
| User/Admin  | **Get Stats** | Get statistics (*total games, n° of wins/losses, games won due to abandon/games lost due to abandon, avarage moves to win/lose*) about a specific player. |
| User/Admin  | **Token Balance** | Allows the user to check how many tokens he/her has left (*This action is the only one which doesn't require the user to have a token balance greater than 0*). |
| Admin  | **Set Tokens** | The Admin user can set any users' token balance to a certain level. |

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

In the following section it will be explained in detail how to interact with the system through the routes mentioned above. It is crucial to understand that all the routes are preceeded by a JWToken authentication head; this means that without one of this tokens the user cannot do any action. The JWT for this project have been generated using https://jwt.io/ (*A service which allows to obtain JWT from payload claims and a secret key*).<br/>
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
This route allows the user to move a pawn in the game he/her is playing (*if the user is not in game an error is returned*) by indicating the array of moves that the pawn has to do in order to reach its final destination. All moves done by the pawn are verified and if some of them violate one or more game rules an error is returned.<br/> The game creator always controlls the white pawns while the opponent has the black ones. Pawn names are always composed by two parts: ('w'/'b') + (pawn number from creator's left to his right); for example the black pawn to the far left (*from the creator point of view*) is named b1.
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
As said before, in order to use this route it's not necessary for the user's token credit to be greater than 0.
<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218709668-117ba391-bc23-48a2-bc1b-b2fb756f91d3.PNG" />
</p>

### Set Tokens 
This is the only route accessible exclusively by the administrator; it allows to set the token balance of any player to any amount.
<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218710586-cdf03139-7ff7-4bc2-8cf6-09eb34ba5e98.PNG" />
</p>

## Design
### Use Case Diagram
<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218714048-45cda074-12ba-4da8-a7e0-1bf6493ae3b1.PNG" />
</p>

### Sequence Diagrams
### New Game 

<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218785351-28b42658-f2b8-4342-a970-ffe7f159778b.PNG" />
</p>

### Move

<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218785514-ac64df88-ca9d-4164-9bec-fe89f5d9515f.png" />
</p>

### Game State

<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218786078-4284c243-134f-4c6b-bfb1-1aff95c646bf.png" />
</p>

### Quit Game

<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218786178-e5799379-7ae3-469a-8fca-3b714777df97.png" />
</p>

### Game Moves
<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218786248-a225894c-26cf-4627-ab78-8e9c6464cc13.png" />
</p>


### Get Ranking

<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218786408-2ce2bb7b-2c1b-48c5-9cfe-5bc20b064cbf.png" />
</p>

### Get Stats

<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218786499-4c798ece-de8c-4f5a-ae63-e5fe910be529.png" />
</p>

### Token Balance

<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218787630-4ce17909-47f1-42ed-a8f1-92f6ca63b9b2.png" />
</p>

### Set Tokens

<p align="center">
  <img src="https://user-images.githubusercontent.com/24567662/218787712-7777abde-03dc-4ac8-9c18-896cc4284efb.png" />
</p>

## Patterns
### Model View Controller
The MVC pattern helps us break up the frontend and backend code into separate components. This way, it's much easier to manage and make changes to either side without them interfering with each other.
It is made up of 3 components:
1. **Model** :
The model's job is to simply manage the data. Whether the data is from a database, API, or a JSON object, the model is responsible for managing it.
2. **Views** :
The view's job is to decide what the user will see on their screen, and how.
3. **Controller** :
The controller's responsibility is to pull, modify, and provide data to the user. Essentially, the controller is the link between the view and model.

In our case, since the View component is represented only by the routes, we didn't have to worry about the notorious problem related to the View-Model relation.

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/MVC_Diagram_%28Model-View-Controller%29.svg/1200px-MVC_Diagram_%28Model-View-Controller%29.svg.png" width="400" />
</p>

### Chain of Responsability
This pattern chains receiving objects together, and then passes any request messages from object to object until it reaches an object capable of handling the message. The number and type of handler objects isn't known a priori, they can be configured dynamically. The chaining mechanism uses recursive composition to allow an unlimited number of handlers to be linked.<br/>
Chain of Responsibility simplifies object interconnections. Instead of senders and receivers maintaining references to all candidate receivers, each sender keeps a single reference to the head of the chain, and each receiver keeps a single reference to its immediate successor in the chain.<br/>
In our case, sequential objects are middleware functions that have access to the requested object (req), the response object (res), and the subsequent middleware function in the request-response application loop. The next middleware function is commonly indicated by a variable called next.
<p align="center">
  <img src="https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/solution1-en.png?id=dccad3e628bd2b8f1856c99369ca6e5b" width="580" />
</p>

### Factory
The factory design pattern is used when we have a superclass with multiple sub-classes and based on input, we need to return one of the sub-class. This pattern takes out the responsibility of the instantiation of a class from the client program to the factory class.<br/>
In our case we used the factory to instantiate the different log message objects.
<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/New_WikiFactoryMethod.png/734px-New_WikiFactoryMethod.png" width="650"/>
</p>

### Singleton
Singleton is a creational design pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance.
The Singleton pattern solves two problems at the same time:
1. Ensure that a class has just a single instance.
2. Provide a global access point to that instance. 

In our case we used the singleton pattern to handle the access to the shared database (*which otherwise could be modified by different objects at the same time*)
<p align="center">
  <img src="https://refactoring.guru/images/patterns/content/singleton/singleton-3x.png" width="350"/>
</p>

### DAO
DAO stands for Data Access Object. DAO Design Pattern is used to separate the data persistence logic in a separate layer. This way, the service remains completely in dark about how the low-level operations to access the database is done. <br/>
In our case we used this pattern to separate the User related operations from the Game related operations (*both done on the same DB*).
<p align="center">
  <img src="https://journaldev.nyc3.digitaloceanspaces.com/2017/11/DAO-Pattern.png" />
</p>




## How to run the software 
1. First of all, clone the git repository in order to obtain all files needed.

```
git clone https://github.com/Alessandrob99/AP_Project
```
2. Once the files have been retrived, open a new terminal in the project's root folder and run the command:
```
npm install 
```
3. Now that all needed dependencies and files have been installed successfully, the SQL database must be configured. To do so, the .env file can be edited to match the local database parameters (*Name, Host, Password, Port*). During the development of this project the DB was created and managed using XAMPP/MySQL. Seeding files for the test DB can be found in the 'Seed' directory.
 
4. At this point we are ready to use all the routes; an API platform for handling HTTP Requests (*like Postman*) could be really useful. The same results can be obtained using the CLI, but the whole process would result much more cumbersome.<br/>
By default, the service can be reached via port 3000 (http://127.0.0.1:3000/), but the latter can be changed editing the .env file (*PORT*). The .env file also contains the secret key used to generate the JWT (*On the https://jwt.io/ page*).


## Frameworks, Libraries and Tools
* [Express](https://expressjs.com/)
* [Node.js](https://nodejs.org/en/)
* [Sequelize](https://sequelize.org/)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Postman](https://www.postman.com/company/about-postman/)
* [XAMPP](https://www.apachefriends.org/)

## Devs
:man_student: [Bedetta Alessandro](https://github.com/Alessandrob99)
