import * as JWTValidation from './user_validation';

export const userJWT = [
    JWTValidation.checkHeader,
    JWTValidation.checkJWToken,
    JWTValidation.verifyAndAuthenticate,
    JWTValidation.checkJwtPayload,
    JWTValidation.checkUserEmail
]

export const adminJWT = [
    JWTValidation.checkHeader,
    JWTValidation.checkJWToken,
    JWTValidation.verifyAndAuthenticate,
    JWTValidation.checkJwtPayload,
    JWTValidation.checkAdminEmail
]


