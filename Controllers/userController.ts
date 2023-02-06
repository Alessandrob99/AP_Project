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

    let all_moves = JSON.parse(foundGame.moves);
    (foundGame.creator === req.user.email)? res.status(200).send(all_moves.white_moves) : res.status(200).send(all_moves.black_moves);

}