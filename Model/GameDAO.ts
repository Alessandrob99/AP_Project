import { DB_Singleton } from "../DB_Connection/singletonDBConnection";

import { DataTypes, STRING, Sequelize } from 'sequelize';

export class GameDao{

    private game : any;

    constructor(){
        const seq = DB_Singleton.getInstance().getConnection();
        this.game = seq.define(
            'Game',
            {
                id: {   //SE LE PARTITE NON VANNO MANTENUTE NEL DB ALLORA LA EMAIL DEL CREATORE PUò ESSERE PK
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                creator: {
                    type: DataTypes.STRING(50),
                    allowNull: false
                },
                opponent: {
                    type: DataTypes.STRING(50),
                    allowNull: false
                },
                state: {  // started , terminated , aborted
                    type: DataTypes.STRING(20),
                    allowNull: false
                },
                positions: {
                    type: DataTypes.STRING(10000),
                    allowNull: false
                },
                winner: {
                    type: DataTypes.STRING(50),
                    allowNull: true,
                    defaultValue: null
                },
                turn: {
                    type: DataTypes.STRING(50),
                    allowNull: false
                },
                moves: {
                    type : DataTypes.STRING(10000),
                    allowNull:false
                }
                
                
            },
            {
                tableName: 'games',
                timestamps: false
            }
        );
    }


    //CRUD Methods----------

        
    //Creation methods
    public async createGame(creator: String, opponent : String, dimension : number) {

        //Ititializing the pawns' positions
        const whites : Object[] = [];
        var y = 0;
        for(var i=1;i<=dimension;i++){
            
            (i%2)!==0 ? y = 1 : y = 2;
            whites.push({
                    name : "w"+i,
                    role: "pawn",  //when pawns reach the other side of the board they become dames
                    x: i,
                    y: y
                }
            );
        }
        //console.log(whites);

        /*
        Depending on whether the grid dimension is even or odd the way that black pawns are 
        positioned is going to be different 
        */
        const blacks : Object[] = []
        if((dimension%2)!==0){
            for(var i=1;i<=dimension;i++){
                (i%2)!==0 ? y = dimension : y = dimension-1;
                blacks.push({
                    name : "b"+i,
                    role: "pawn",  //when pawns reach the other side of the board they become dames
                    x: i,
                    y: y
                });
            }
        }else{
            for(var i=1;i<=dimension;i++){
                (i%2)!==0 ? y = dimension-1 : y = dimension;
                blacks.push({
                    name : "b"+i,
                    role: "pawn",  //when pawns reach the other side of the board they become dames
                    x: i,
                    y: y
                });
            }
        }


        const board : Map<String,Object> = new Map();
        board.set("whites",whites);
        board.set("blacks",blacks);


        //Converting map to object and then to json string
        var objJson = Object.fromEntries(board);
        var positions = JSON.stringify(objJson);


        var newGame = this.game.build(
            {
                creator: creator, 
                opponent: opponent, 
                state: "started",
                positions: positions,
                winner: null,
                turn: creator,
                moves: String('{"white_moves":[],"black_moves":[]}')
            }
        );
        await newGame.save();
    }


    //Reading methods
    

    public async readGame(id : number){
        const { Op } = require("sequelize");
        var game = await this.game.findOne({where: {
            id: id
        }});
        return game;
    }

    //Checks if the user is in a game which is not over
    public async checkUserGame(email : String){
        const { Op } = require("sequelize");
        var game = await this.game.findOne({where: 
            {
                [Op.and]: [
                    {[Op.or]: [
                        {creator: email},
                        {opponent: email}
                    ]},
                    {state: "started"}
                ]
            }
        });
        return game;
    }

    //Returns all the games related to a specific player
    public async checkAllUserGames(email : String){
        const { Op } = require("sequelize");
        var games = await this.game.findAll({where: 
            {[Op.or]: [
                {creator: email},
                {opponent: email}
            ]}
        });
        return games;
    }

    //Updating methods
    //Update game general info 
    public async updateGameInfo(id: number, state: String, winner: String, moves: String, turn : String, positions: String){
        var gameToUpdate = await this.game.findByPk(id);
        //No need to do a check bc at this point we know that the game exists
        await gameToUpdate.update({
            state: state,
            winner: winner,
            moves: moves,
            turn: turn,
            positions: positions 
        });
        await gameToUpdate.save();
    }

}