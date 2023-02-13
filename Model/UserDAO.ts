import { DB_Singleton } from "../DB_Connection/singletonDBConnection";

import { DataTypes, Sequelize, QueryTypes } from 'sequelize';



export class UserDao{

    private user : any;
    private seq : any;
    /*
    The constructor gets the DB connection instance and uses it to 
    define the User model through the Sequelize object
    */
    constructor(){
        this.seq = DB_Singleton.getInstance().getConnection();
        this.user = this.seq.define(
            'User',
            {
                email: {
                type: DataTypes.STRING(50),
                primaryKey: true,
                },
                role: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                token_balance: {
                    type: DataTypes.FLOAT,
                    allowNull: false
                }
            },
            {
                tableName: 'users',
                timestamps: false
            }
            
        )
    }


    //CRUD Methods----------

    //Creation methods
    public async createUser(email: String) {
        var newUser = this.user.build({email: email, role: 1, token_balance: 50});
        await newUser.save();
    }

    //Reading methods
    public async readUser(email: String){
        var foudUser = await this.user.findByPk(email);
        return foudUser;
    }


    //Returns the players ranking using raw queries
    public async getUsersCharts(order: String){
        var usersRundown : any;
        if(order=="asc"){
            usersRundown = await this.seq.query("SELECT games.winner as 'player' ,count(games.winner) as 'game_won' FROM `games` GROUP BY games.winner ORDER BY 2 ASC;", {
                type: QueryTypes.SELECT
            });
        }else{
            usersRundown = await this.seq.query("SELECT games.winner as 'player' ,count(games.winner) as 'game_won' FROM `games` GROUP BY games.winner ORDER BY 2 DESC;", {
                type: QueryTypes.SELECT
            });
        }
        return(usersRundown);
    }

    //Updating methods

    //Withdraws a certain amount of tokens from a specific user's profile
    public async withdrawTokens(email: String, amount : number){
        var userToUpdate = await this.user.findByPk(email);
        await userToUpdate.update({
            token_balance: userToUpdate.token_balance-amount
        });
        await userToUpdate.save();
    }

    //Updates the token balance of a certain user (Only accessible by the admins)
    public async updateUserTokens(email: String, token_balance : Number) {
        var userToUpdate = await this.user.findByPk(email);
        if(!userToUpdate){
            throw ReferenceError;
        }else{
            await userToUpdate.update({
                token_balance: token_balance
            });
            await userToUpdate.save();
        }
        
    }

    //Deleting methods
    public deleteUser(email: String) {
        throw new Error("Method not implemented.");
    } 

}








