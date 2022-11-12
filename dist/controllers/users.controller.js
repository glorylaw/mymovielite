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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.createUser = void 0;
const utils_1 = require("../utils/utils");
const users_model_1 = require("../models/users.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = {
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
            };
            //validate user input and check and errors
            const { error } = yield (0, utils_1.validateUserRegInput)(user);
            if (error) {
                const err = error.details[0].message;
                return res.status(400).render("error", { error: err });
            }
            const userData = yield (0, users_model_1.regDetails)(user);
            if (userData === null || userData === void 0 ? void 0 : userData.error) {
                return res.status(500).json({ error: "User already exists" });
            }
            else {
                return res.status(201).redirect("/movie/movies");
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createUser = createUser;
function logIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = {
                email: req.body.email,
                password: req.body.password,
            };
            const { error } = yield (0, utils_1.validateLoginInput)(user);
            if (!error) {
                const dataObj = yield (0, users_model_1.loginDetails)(user);
                if (dataObj && (yield bcrypt_1.default.compare(user.password, dataObj.password))) {
                    //cookie/token
                    const token = yield (0, utils_1.generateToken)(`${dataObj.id}`); // generate token
                    //save token inside cookie
                    res.cookie('token', token);
                    return res.status(200).redirect('/movie/movies');
                }
                else {
                    res.status(400);
                    throw new Error('Invalid emailaddress or password');
                }
            }
        }
        catch (err) {
            res.render("error", { error: err });
        }
    });
}
exports.logIn = logIn;
