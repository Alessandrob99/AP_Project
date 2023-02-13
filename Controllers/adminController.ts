import { MessEnum } from "../Logging_Factory/MessFactory";
import { UserDao } from "../Model/UserDAO";
import { messageLogger } from "../Middleware_Components/MessLog";


const userDaoInst = new UserDao();

export const newTokenBalance = async (req,res,next) => {
    try{
        await userDaoInst.updateUserTokens(req.body.email, req.body.token);
        next(MessEnum.TokenBalanceUpdated);
    }catch(ReferenceError){
        next(MessEnum.UserNotFound);
    }
}
