"use strict";
exports.__esModule = true;
exports.DB_Singleton = void 0;
var sequelize_1 = require("sequelize");
var dotenv = require('dotenv');
dotenv.config();
//Singleton object that handles the shared resource (DB)
var DB_Singleton = /** @class */ (function () {
    //The signature private constructor
    function DB_Singleton() {
        var database = process.env.DB_NAME;
        var username = process.env.DB_USER;
        var password = process.env.DB_PASS;
        var host = process.env.DB_HOST;
        var port = Number(process.env.DB_PORT);
        //Initialize the sequelize object that will be used by the DAOs
        this.connection = new sequelize_1.Sequelize(database, username, password, {
            host: host,
            port: port,
            dialect: 'mysql'
        });
    }
    //Returns the connection instance
    DB_Singleton.getInstance = function () {
        if (!DB_Singleton.instance) {
            DB_Singleton.instance = new DB_Singleton();
        }
        return DB_Singleton.instance;
    };
    DB_Singleton.prototype.getConnection = function () {
        return this.connection;
    };
    return DB_Singleton;
}());
exports.DB_Singleton = DB_Singleton;
