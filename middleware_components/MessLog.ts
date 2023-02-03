import { MessFactory , MessEnum } from "../Logging_Factory/MessFactory";

export const messageLogger =  (mess: MessEnum, req: any, res: any, next: any) => {
    var concreteFactory : MessFactory = new MessFactory();
    var messageOb = concreteFactory.getMessage(mess);
    var message = messageOb.getMess();
    var status = messageOb.getCode();
    console.log(message)
    res.status(status).json({Status : status, Description: message});

};