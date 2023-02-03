import { DB_Singleton } from "../DB_Connection/singletonDBConnection";

import { DataTypes, Sequelize } from 'sequelize';



export class UserDao{

    private user : any;
    /*
    The constructor gets the DB connection instance and uses it to 
    define the User model through the Sequelize object
    */
    constructor(){
        const seq = DB_Singleton.getInstance().getConnection();
        this.user = seq.define(
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

    //Updating methods
    public async withdrawTokens(email: String, amount : number){
        var userToUpdate = await this.user.findByPk(email);
        await userToUpdate.update({
            token_balance: userToUpdate.token_balance-amount
        });
        await userToUpdate.save();
    }

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








