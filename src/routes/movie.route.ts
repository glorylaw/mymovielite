import express, { Request, Response, NextFunction} from  'express';
import { createMovie, create_movie, deleteMovie, edit, getMovies, movieDelete, updateMovie } from '../controllers/movies.controller';
import { validateToken } from '../middleware/auth';
const router = express.Router();

/* GET users listing. */
router.get('/movies', validateToken, getMovies );

router.post('/add-movie', validateToken, createMovie)
router.get('/add_movies', validateToken, create_movie)


router.put("/edit-movie/:id", validateToken, updateMovie)
router.get('/update-movie/:id', validateToken, edit)

router.delete("/delete-movie/:id", validateToken, deleteMovie )
router.get("/delete-movie/:id", validateToken, movieDelete )

export default router
