import * as JWTValidation from './user_validation';
import * as GameValidation from './requestValidation';
import { messageLogger } from './MessLog';

export const userJWT = [
    JWTValidation.checkHeader,
    JWTValidation.checkJWToken,
    JWTValidation.verifyAndAuthenticate,
    JWTValidation.checkJwtPayload,
    JWTValidation.checkUserEmail,
    GameValidation.checkUserTokenBalance,
    //messageLogger
]

export const adminJWT = [
    JWTValidation.checkHeader,
    JWTValidation.checkJWToken,
    JWTValidation.verifyAndAuthenticate,
    JWTValidation.checkJwtPayload,
    JWTValidation.checkAdminEmail,
    //messageLogger
]


export const newTokenBalanceVal = [
    GameValidation.checkReqBody,
    GameValidation.checkReqTokenBalance
]

