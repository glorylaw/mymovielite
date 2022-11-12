import * as fs from "fs";
import path from "path";
import readDataFile from "../utils/utils";
import { v4 as uuidv4 } from "uuid";
const _ = require("lodash");

//add a movie
export async function addMovie(movie: Movie) {
  try {
    //check if the file exists
    const pathName: string = path.join(__dirname, "movies.json");
    const fileExists = fs.existsSync(pathName);
    if (!fileExists) {
      movie.id = uuidv4();
      fs.writeFileSync(pathName, JSON.stringify([movie], null, 2));
      //return movie-data to user
      const dataObj = { value: movie, error: null };
      return dataObj;
    }
    //if it exists;
    if (fileExists) {
      movie.id = uuidv4();
      const movieDb = await readDataFile(pathName);
      const movieBaseObj: Movie[] = JSON.parse(movieDb);
      movieBaseObj.push(movie);
      fs.writeFileSync(pathName, JSON.stringify(movieBaseObj, null, 2));
      //return movie-data to user
      const movieObj = { value: movie, error: null };
      return movieObj;
    }
  } catch (err) {
    console.error(err);
  }
}

//get all movies
export async function readMovies() {
  //define the filepath;
  const pathName: string = path.join(__dirname, "movies.json");
  try {
    const fileExist = fs.existsSync(pathName);
    // check if file does not exist!
    if (!fileExist) {
      throw new Error("Something went wrong");
    } else {
      const movieDb = await readDataFile(pathName);
      const dbParsedObj = JSON.parse(movieDb);
      const dataBaseObj = { value: dbParsedObj, error: null };
      return dataBaseObj;
    }
  } catch (err) {
    console.error(err);
    const errorObj = { value: null, error: err };
    return errorObj;
  }
}

//update movie
export async function editMovie(movie: Movie, id: string) {
  //define the filepath;
  const pathName: string = path.join(__dirname, "movies.json");
  try {
    const fileExist = fs.existsSync(pathName);
    if (!fileExist) {
      throw new Error("Something went wrong");
    } else {
      //destructure properties from request body
      const { description, title, price, image } = movie;
      const movieDb = await readDataFile(pathName);
      const parsedMovies: Movie[] = JSON.parse(movieDb);
      console.log(id)
      //find the particular movie to be edited.
      const movieIndex: number = parsedMovies.findIndex((item) => {
        return item.id === id;
      });
      
      //if movie does not exist
      if (movieIndex === -1) {
        throw new Error("Movie is not available");
      } else {
        //modified... insert req body data to that of the database.
        parsedMovies[movieIndex].title =
          title || parsedMovies[movieIndex].title;
        parsedMovies[movieIndex].description =
          description || parsedMovies[movieIndex].description;
        parsedMovies[movieIndex].image =
          image || parsedMovies[movieIndex].image;
        parsedMovies[movieIndex].price =
          price || parsedMovies[movieIndex].price;

        //write back to the file;
        fs.writeFile(pathName, JSON.stringify(parsedMovies, null, 2), (err) => {
          if (err) {
            throw new Error("Something went wrong");
          } else {
            const movieObj = { value: parsedMovies, error: null };
            return movieObj;
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

//Delete Movie
export async function removeMovie(id: string) {
  const pathName: string = path.join(__dirname, "movies.json");
  try {
    const fileExist = fs.existsSync(pathName);
    if (!fileExist) {
      throw new Error("Something went wrong");
    } else {
      //read from database;
      const movieDb = await readDataFile(pathName);
      const parsedMovies: Movie[] = JSON.parse(movieDb);

      // find index of author;
      const movieIndex = parsedMovies.findIndex((item) => {
        return item.id === id;
      });
      //always check if the movie exists
      if (movieIndex === -1) {
        throw new Error("Movie does not exist");
      } else {
        parsedMovies.splice(movieIndex, 1);

        //write back to database;
        fs.writeFile(pathName, JSON.stringify(parsedMovies, null, 2), (err) => {
          if (err) {
            throw new Error("Something went wrong");
          } else {
            const movieObj = { value: parsedMovies[movieIndex], error: null };
            return movieObj;
          }
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
}
