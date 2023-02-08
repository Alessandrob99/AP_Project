import { MessEnum } from "../Logging_Factory/MessFactory";
import { GameDao } from "../Model/GameDAO";
import { UserDao } from "../Model/UserDAO";
import { messageLogger } from "../middleware_components/MessLog";
const { parse } = require('json2csv');
const fields = ['pawn', 'xfrom', 'yfrom', 'xto', 'yto'];

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
    var foundGame = await gameDaoInst.readGame(parseInt(req.params.id));
    if(foundGame){
        res.status(200).send({
            "creator" :foundGame.creator,
            "opponent" :foundGame.opponent,
            "state": foundGame.state,
            "turn": foundGame.turn,
            "winner": foundGame.winner,
            "positions": foundGame.positions
        });
    }else{
        next(MessEnum.GameNotFound);
    }
}

//Returns all moves done in a game through either a csv or a json
export const getGameMoves = async(req,res,next) => {
    var foundGame = await gameDaoInst.readGame(parseInt(req.params.id));
    if(foundGame){
        let all_moves = JSON.parse(foundGame.moves);
        //FORMAT = 1 means CSV
        if(req.params.format === "csv"){
            console.log("CSV");
            const csv_white = parse(all_moves.white_moves, {fields});
            const csv_black =  parse(all_moves.black_moves,{fields}).split("\n").slice(1).join("\n")
            res.status(200).send(csv_white+"\n"+csv_black);
        }else{ 
            console.log("JSON");
            res.status(200).send(all_moves);
        }
    }else{
        next(MessEnum.GameNotFound);
    }

}

//Given an email, returns the token balance associated with it
export const getTokenBalance =async (req,res,next) => {
    var foundUser = await userDaoInst.readUser(req.user.email);
    
    res.status(200).send({
        "token_balance" : foundUser.token_balance
    });
}


//Methods that makes the user quit a game and updates all the game info in the db
export const quitGame =async (req,res,next) => {
    var winner : String;
    //We know at this point that the user is either the creator or the opponent
    (req.user.email === req.game.creator)? winner = req.game.opponent : winner = req.game.creator;
    gameDaoInst.updateGameInfo(parseInt(req.params.id),"abandoned",winner,req.game.moves,"",req.game.positions);
    res.status(200).json({Status : 200, Description: "Operation completed - You abandoned the game"});
}

//Methods that returns the specified user's statistics
export const getStats =async (req,res,next) => {
    //Check if the user hasn't played any games yet (we know the user exists)
    var foundGames = await gameDaoInst.checkAllUserGames(req.params.email);
    if(foundGames.length!== 0){
        //All games
        const games = foundGames.filter( game => game.state !== "started");
        const tot_games = games.length;

        //Wins - losses - All moves to win - All moves to lose - Wins and Losses due to abandon  
        var wins = 0;
        var losses = 0;
        var wins_abandon = 0;
        var losses_abandon = 0;
        var win_moves = 0;
        var loss_moves = 0;
        for(var i = 0; i<tot_games;i++){
            var moves = JSON.parse(games[i].moves)
            if(games[i].winner === req.params.email){
                (req.params.email===games[i].creator)? win_moves+=moves.white_moves.length : win_moves+=moves.black_moves.length;
                wins+=1;
                (games[i].state==="abandoned")? wins_abandon+=1 : {};
            }else{
                (req.params.email===games[i].creator)? loss_moves+=moves.white_moves.length : loss_moves+=moves.black_moves.length;
                losses+=1;
                (games[i].state==="abandoned")? losses_abandon+=1 : {};
            } 
        }
        res.status(200).json({
            total_games : tot_games,
            won_games: wins,
            lost_games: losses,
            won_abandoned_games : wins_abandon,
            lost_abandoned_games: losses_abandon,
            avg_n_moves_to_win : (win_moves/wins),
            avg_n_moves_to_lose: (loss_moves/losses)
        });
    }else{
        next(MessEnum.NoGamesFound);
    }
}