import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req: Request, res: Response, next: NextFunction) {
  res.render('login', { title: 'Express' });
});

router.get('/register', function(req: Request, res: Response, next: NextFunction) {
  res.render('register', { title: 'Express' });
});


router.get('/logout', function(req: Request, res: Response, next: NextFunction) {
  res.render('logout', { title: 'Express' });
});

export default router
