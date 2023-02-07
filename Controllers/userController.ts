import { MessEnum } from "../Logging_Factory/MessFactory";
import { GameDao } from "../Model/GameDAO";
import { UserDao } from "../Model/UserDAO";
import { messageLogger } from "../middleware_components/MessLog";
import { parse } from 'json2csv';

const userDaoInst = new UserDao();
const gameDaoInst = new GameDao();

export const newGame = async (req,res,next) => {
    
    await gameDaoInst.createGame(req.user.email, req.body.opponent, req.body.dimension);
    await userDaoInst.withdrawTokens(req.user.email, 0.35); 
    next(MessEnum.NewGameCreated);
}

export const move = async (req,res,next) => {
    //TBD Check move validity
    console.log("mossa fatta");
    next();
}

export const getGameInfo = async (req,res,next) => {
    var foundGame = await gameDaoInst.readGame(req.query.id);
    if(foundGame){
        res.status(200).send({
            "creator" :foundGame.creator,
            "opponent" :foundGame.opponent,
            "turn": foundGame.turn,
            "winner": foundGame.winner,
            "positions": foundGame.positions
        });
        next();
    }else{
        next(MessEnum.GameNotFound);
    }
}

export const getGameMoves = async(req,res,next) => {
    var foundGame = await gameDaoInst.readGame(req.query.id);
    if(foundGame){
        let all_moves = JSON.parse(foundGame.moves);
        //FORMAT = 1 means CSV
        if(req.query.format === "1"){
            console.log("CSV");
            const csv_white = parse(all_moves.white_moves);
            const csv_black =  parse(all_moves.black_moves).split("\n").slice(1).join("\n")
            res.status(200).send(csv_white+"\n"+csv_black);
        }else{ 
            console.log("JSON");
            res.status(200).send(all_moves);
        }
    }else{
        next(MessEnum.GameNotFound);
    }

}


export const getTokenBalance =async (req,res,next) => {
    var foundUser = await userDaoInst.readUser(req.user.email);
    
    res.status(200).send({
        "token_balance" : foundUser.token_balance
    });
    next();
}