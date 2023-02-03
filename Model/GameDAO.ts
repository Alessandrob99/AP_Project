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
                dimension: {
                    type: DataTypes.INTEGER,
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
        var newGame = this.game.build(
            {
                creator: creator, 
                opponent: opponent, 
                state: 1,
                dimension: dimension,
                winner: null,
                turn: creator
            }
        );
        await newGame.save();
    }

}