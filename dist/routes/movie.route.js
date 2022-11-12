"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_controller_1 = require("../controllers/movies.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
/* GET users listing. */
router.get('/movies', auth_1.validateToken, movies_controller_1.getMovies);
router.post('/add-movie', auth_1.validateToken, movies_controller_1.createMovie);
router.get('/add_movies', auth_1.validateToken, movies_controller_1.create_movie);
router.put("/edit-movie/:id", auth_1.validateToken, movies_controller_1.updateMovie);
router.get('/update-movie/:id', auth_1.validateToken, movies_controller_1.edit);
router.delete("/delete-movie/:id", auth_1.validateToken, movies_controller_1.deleteMovie);
router.get("/delete-movie/:id", auth_1.validateToken, movies_controller_1.movieDelete);
exports.default = router;
