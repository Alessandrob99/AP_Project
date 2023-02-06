import { MessEnum } from "../Logging_Factory/MessFactory";
import { GameDao } from "../Model/GameDAO";
import { UserDao } from "../Model/UserDAO";
import { messageLogger } from "../middleware_components/MessLog";


const userDaoInst = new UserDao();
const gameDaoInst = new GameDao();

export const newGame = async (req,res,next) => {
    
    await gameDaoInst.createGame(req.user.email, req.body.opponent, req.body.dimension);
    await userDaoInst.withdrawTokens(req.user.email, 0.35); 
    next(MessEnum.NewGameCreated);
}

export const move = async (req,res,next) => {
    console.log("mossa fatta");
    next();
}

