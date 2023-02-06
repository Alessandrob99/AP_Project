import { DB_Singleton } from "../DB_Connection/singletonDBConnection";

import { DataTypes, Sequelize } from 'sequelize';

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
                state: {  // 1= ongoing , 2 = terminated , 3 = aborted
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                positions: {
                    type: DataTypes.STRING(1000),
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
                state: 1,
                positions: positions,
                winner: null,
                turn: creator
            }
        );
        await newGame.save();
    }


    //Reading methods
    public async checkUserGame(email : String){
        const { Op } = require("sequelize");
        var game = await this.game.findOne({where: {
            [Op.or]: [
                {creator: email},
                {opponent: email}
            ]
        }});
        return game;
    }
}