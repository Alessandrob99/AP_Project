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
                autoIncrement: true
                },
                role: {
                    type: DataTypes.INTEGER,
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
    public async createUser(email: String) {
        var newUser = this.user.build({email: email, role: 1});
        await newUser.save();
        //TBD factory logging
    }
    public async readUser(email: String){
        var foudUser = await this.user.findByPk(email);
        return foudUser;
    }
    public updateUser(email: String) {
        throw new Error("Method not implemented.");
    }
    public deleteUser(email: String) {
        throw new Error("Method not implemented.");
    } 

}








