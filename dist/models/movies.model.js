"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMovie = exports.editMovie = exports.readMovies = exports.addMovie = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = __importDefault(require("../utils/utils"));
const uuid_1 = require("uuid");
const _ = require("lodash");
//add a movie
function addMovie(movie) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //check if the file exists
            const pathName = path_1.default.join(__dirname, "movies.json");
            const fileExists = fs.existsSync(pathName);
            if (!fileExists) {
                movie.id = (0, uuid_1.v4)();
                fs.writeFileSync(pathName, JSON.stringify([movie], null, 2));
                //return movie-data to user
                const dataObj = { value: movie, error: null };
                return dataObj;
            }
            //if it exists;
            if (fileExists) {
                movie.id = (0, uuid_1.v4)();
                const movieDb = yield (0, utils_1.default)(pathName);
                const movieBaseObj = JSON.parse(movieDb);
                movieBaseObj.push(movie);
                fs.writeFileSync(pathName, JSON.stringify(movieBaseObj, null, 2));
                //return movie-data to user
                const movieObj = { value: movie, error: null };
                return movieObj;
            }
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.addMovie = addMovie;
//get all movies
function readMovies() {
    return __awaiter(this, void 0, void 0, function* () {
        //define the filepath;
        const pathName = path_1.default.join(__dirname, "movies.json");
        try {
            const fileExist = fs.existsSync(pathName);
            // check if file does not exist!
            if (!fileExist) {
                throw new Error("Something went wrong");
            }
            else {
                const movieDb = yield (0, utils_1.default)(pathName);
                const dbParsedObj = JSON.parse(movieDb);
                const dataBaseObj = { value: dbParsedObj, error: null };
                return dataBaseObj;
            }
        }
        catch (err) {
            console.error(err);
            const errorObj = { value: null, error: err };
            return errorObj;
        }
    });
}
exports.readMovies = readMovies;
//update movie
function editMovie(movie, id) {
    return __awaiter(this, void 0, void 0, function* () {
        //define the filepath;
        const pathName = path_1.default.join(__dirname, "movies.json");
        try {
            const fileExist = fs.existsSync(pathName);
            if (!fileExist) {
                throw new Error("Something went wrong");
            }
            else {
                //destructure properties from request body
                const { description, title, price, image } = movie;
                const movieDb = yield (0, utils_1.default)(pathName);
                const parsedMovies = JSON.parse(movieDb);
                console.log(id);
                //find the particular movie to be edited.
                const movieIndex = parsedMovies.findIndex((item) => {
                    return item.id === id;
                });
                //if movie does not exist
                if (movieIndex === -1) {
                    throw new Error("Movie is not available");
                }
                else {
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
                        }
                        else {
                            const movieObj = { value: parsedMovies, error: null };
                            return movieObj;
                        }
                    });
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.editMovie = editMovie;
//Delete Movie
function removeMovie(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const pathName = path_1.default.join(__dirname, "movies.json");
        try {
            const fileExist = fs.existsSync(pathName);
            if (!fileExist) {
                throw new Error("Something went wrong");
            }
            else {
                //read from database;
                const movieDb = yield (0, utils_1.default)(pathName);
                const parsedMovies = JSON.parse(movieDb);
                // find index of author;
                const movieIndex = parsedMovies.findIndex((item) => {
                    return item.id === id;
                });
                //always check if the movie exists
                if (movieIndex === -1) {
                    throw new Error("Movie does not exist");
                }
                else {
                    parsedMovies.splice(movieIndex, 1);
                    //write back to database;
                    fs.writeFile(pathName, JSON.stringify(parsedMovies, null, 2), (err) => {
                        if (err) {
                            throw new Error("Something went wrong");
                        }
                        else {
                            const movieObj = { value: parsedMovies[movieIndex], error: null };
                            return movieObj;
                        }
                    });
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.removeMovie = removeMovie;
