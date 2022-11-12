import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import path  from 'path';
import readDataFile from '../utils/utils';

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    let token;
    if(req.cookies.token){
        try{
            token = req.cookies.token; 
            // Verify Token
            if (process.env.JWT_SECRET){
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // Get user from the token
                const pathName = path.join(__dirname,'..', path.sep, '/models/userdata.json')
                const allData = await readDataFile(pathName);
                next();
            }
        }catch(error){
            console.log(error)
            res.status(401);
            throw new Error('Not authorized');
        }
    }else if(((req.headers.authorization !== undefined) && (req.headers.authorization.startsWith('Bearer'))) ){
        try{
            token = req.headers.authorization.split(' ')[1] 
            // Verify Token
            if (process.env.JWT_SECRET){
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // Get user from the token
                const pathName = path.join(__dirname, 'userdata.json')
                const allData = await readDataFile(pathName);
                next();
            }
        }catch(error){
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    if(!token){
        res.status(401);
        res.redirect('/users/login')
    }
}
