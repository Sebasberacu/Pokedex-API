import { Request, Response, NextFunction } from 'express';
import { checkUser } from '../collections/User.collection';

// Used to check the 'Pokemon' and 'Move' routes.
const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const authorizationContent:String = req.headers.authorization;
        const [username, password] = authorizationContent.split(':');

        if (await checkUser(username, password)){ // Exists an user with that 'username' and 'password'
            next();
        } else {
            res.status(401).json({
                message: 'User not found.'
            });
        }
    } else { // Authorization not included
        res.status(401).json({
            message: 'User not authorized.'
        });
    }
};

export default authenticationMiddleware;
