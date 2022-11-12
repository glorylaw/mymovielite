"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_controller_1 = require("../controllers/movies.controller");
const router = express_1.default.Router();
/* GET users listing. */
router.get('/movies', movies_controller_1.getMovies);
router.post('/add-movie', movies_controller_1.createMovie);
router.get('/add_movies', movies_controller_1.create_movie);
router.put("/edit-movie/:id", movies_controller_1.updateMovie);
router.delete("/delete-movie/:id", movies_controller_1.deleteMovie);
exports.default = router;
