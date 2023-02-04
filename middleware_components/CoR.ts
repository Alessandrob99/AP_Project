import * as JWTValidation from './user_validation';
import * as RequestValidation from './requestValidation';
import { messageLogger } from './MessLog';

export const JWTCheck = [
    JWTValidation.checkHeader,
    JWTValidation.checkJWToken,
    JWTValidation.verifyAndAuthenticate,
    JWTValidation.checkJwtPayload
]

export const userAccountAndBalanceCheck = [
    JWTValidation.checkUserEmail,
    RequestValidation.checkUserTokenBalance,
]

export const adminCheck = [
    JWTValidation.checkAdminEmail,
]


export const newTokenBalanceVal = [
    RequestValidation.checkReqBody,
    RequestValidation.checkReqTokenBalance
]

export const newGameVal = [
    RequestValidation.checkReqBody,
    RequestValidation.checkReqBodyNewGame,
    RequestValidation.checkAlreadyInGame, // if one of the two challengers are in game the new game cannot be created
    RequestValidation.checkNewGameBalance
]