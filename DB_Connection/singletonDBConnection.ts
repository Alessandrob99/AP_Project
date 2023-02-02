
import { Sequelize } from 'sequelize';

const dotenv = require('dotenv');

dotenv.config();

export class DB_Singleton {
    
    private static instance: DB_Singleton;
    private connection: Sequelize;

    private constructor() {
        const database: string = <string> process.env.DB_NAME;
        const username: string = <string> process.env.DB_USER;
        const password: string = <string> process.env.DB_PASS;
        const host: string = <string> process.env.DB_HOST;
        const port: number = Number(process.env.DB_PORT);

        this.connection = new Sequelize(database, username, password, {
            host: host,
            port: port,
            dialect: 'mysql'
        });
    }

    public static getInstance(): DB_Singleton {
        if (!DB_Singleton.instance) {
            DB_Singleton.instance = new DB_Singleton();
        }
        return DB_Singleton.instance;
    }

    public getConnection(): Sequelize {
        return this.connection;
    }
}