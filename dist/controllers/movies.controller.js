"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieDelete = exports.deleteMovie = exports.edit = exports.updateMovie = exports.getMovies = exports.create_movie = exports.createMovie = void 0;
const movies_model_1 = require("../models/movies.model");
const utils_1 = require("../utils/utils");
function createMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const movie = req.body;
            const { error } = yield (0, utils_1.validateMovie)(movie);
            if (error) {
                const err = error.details[0].message;
                return res.status(400).render("error", { error: err });
            }
            else {
                const movieData = yield (0, movies_model_1.addMovie)(movie);
                if (movieData === null || movieData === void 0 ? void 0 : movieData.error) {
                    return res.status(500).json({ error: "cannot create movie" });
                }
                else {
                    return res.status(201).redirect("/movie/movies");
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createMovie = createMovie;
// post movie/get
function create_movie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render('add-movie');
    });
}
exports.create_movie = create_movie;
//get movies
function getMovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, movies_model_1.readMovies)();
            const message = "Movies";
            if (result.error) {
                res
                    .status(404)
                    .render("error", { result: result.error, message: "Movies not found" });
            }
            else {
                res.status(200).render('movies', { movies: result.value, message: message });
                //   res.status(200).render('movies', { movies: result.value, message: message })
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getMovies = getMovies;
//update movie
function updateMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            if (!req.body) {
                res.status(400);
                throw new Error("No data given");
            }
            const movieDetail = req.body;
            const result = yield (0, movies_model_1.editMovie)(movieDetail, id);
            res.status(200).redirect("/movie/movies");
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.updateMovie = updateMovie;
//edit movie, get for the put request!
function edit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        res.render('update', { id });
    });
}
exports.edit = edit;
//delete movie
//delete Author
function deleteMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, movies_model_1.removeMovie)(req.params.id);
            let message = "Movie successfully deleted";
            res.status(200).redirect("/movie/movies");
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.deleteMovie = deleteMovie;
function movieDelete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        res.render('delete', { id });
    });
}
exports.movieDelete = movieDelete;
