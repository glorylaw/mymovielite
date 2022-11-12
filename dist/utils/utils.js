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
exports.validateMovie = exports.generateToken = exports.hashPassword = exports.validateLoginInput = exports.validateUserRegInput = void 0;
const fs = __importStar(require("fs"));
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function readDataFile(filepath) {
    return new Promise((resolve, reject) => {
        let data = "";
        let readStream = fs.createReadStream(filepath, "utf8");
        //reading in chunks
        readStream.on("data", (chunk) => {
            data += chunk;
        });
        // on end
        readStream.on("end", () => {
            return resolve(data);
        });
        // on error
        readStream.on("error", (error) => {
            return reject(error);
        });
    });
}
exports.default = readDataFile;
//---Validate registered user  details.
function validateUserRegInput(user) {
    return __awaiter(this, void 0, void 0, function* () {
        //define a schema;
        const schema = joi_1.default.object({
            fullname: joi_1.default.string().required(),
            username: joi_1.default.string().required(),
            email: joi_1.default.string()
                .email({
                minDomainSegments: 2,
                tlds: { allow: ["com", "net"] },
            })
                .required(),
            password: joi_1.default.string()
                .pattern(new RegExp("^[a-zA-Z0-9]{3,1024}$"))
                .required(),
            confirmPassword: joi_1.default.ref("password"),
        });
        return schema.validate(user);
    });
}
exports.validateUserRegInput = validateUserRegInput;
//--Validate login users;
function validateLoginInput(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object({
            email: joi_1.default.string().email({
                minDomainSegments: 2,
                tlds: { allow: ["com", "net"] },
            }),
            password: joi_1.default.string()
                .pattern(new RegExp("^[a-zA-Z0-9]{3,1024}$"))
                .required(),
        });
        return schema.validate(user);
    });
}
exports.validateLoginInput = validateLoginInput;
//hashing passwords
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        return hashed;
    });
}
exports.hashPassword = hashPassword;
//generate token
function generateToken(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.env.JWT_SECRET) {
            return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: "30d",
            });
        }
    });
}
exports.generateToken = generateToken;
;
//validate movie
function validateMovie(movie) {
    return __awaiter(this, void 0, void 0, function* () {
        //define a schema;
        const schema = joi_1.default.object({
            title: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            image: joi_1.default.string(),
            price: joi_1.default.string().required(),
        });
        return schema.validate(movie);
    });
}
exports.validateMovie = validateMovie;
