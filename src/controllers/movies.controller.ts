import { Request, Response } from "express";
import {
  addMovie,
  editMovie,
  readMovies,
  removeMovie,
} from "../models/movies.model";
import { validateMovie } from "../utils/utils";

export async function createMovie(req: Request, res: Response) {
  try {
    const movie: Movie = req.body;
    const { error } = await validateMovie(movie);
    if (error) {
      const err = error.details[0].message;
      return res.status(400).render("error", { error: err });
    } else {
      const movieData = await addMovie(movie);
      if (movieData?.error) {
        return res.status(500).json({ error: "cannot create movie" });
      } else {
        return res.status(201).redirect("/movie/movies")
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// post movie/get
export async function create_movie(req: Request, res: Response) {
  res.render('add-movie')
}

//get movies
export async function getMovies(req: Request, res: Response) {
  try {
    const result = await readMovies();
    const message = "Movies";

    if (result.error) {
      res
        .status(404)
        .render("error", { result: result.error, message: "Movies not found" });
    } else {
      res.status(200).render('movies', { movies: result.value, message: message });
      //   res.status(200).render('movies', { movies: result.value, message: message })
    }
  } catch (error) {
    console.log(error);
  }
}

//update movie
export async function updateMovie(req: Request, res: Response) {
  const id: string = req.params.id;
  try {
    if (!req.body) {
      res.status(400);
      throw new Error("No data given");
    }
    const movieDetail: Movie = req.body;
    const result = await editMovie(movieDetail, id);
    res.status(200).redirect("/movie/movies");
  } catch (error) {
    console.log(error);
  }
}

//edit movie, get for the put request!
export async function edit(req: Request, res: Response) {
  const id: string = req.params.id
  res.render('update', { id })
}

//delete movie
//delete Author
export async function deleteMovie(req: Request, res: Response) {
  try {
    const result = await removeMovie(req.params.id);
    let message = "Movie successfully deleted";
    res.status(200).redirect("/movie/movies")
  } catch (error) {
    console.log(error);
  }
}

export async function movieDelete(req: Request, res: Response) {
  const id = req.params.id
  res.render('delete', { id })
}
