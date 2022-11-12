import express, { Request, Response, NextFunction} from  'express';
import { createUser, logIn } from '../controllers/users.controller';
const router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});

router.post('/register', createUser )
router.post('/login', logIn)

export default router
