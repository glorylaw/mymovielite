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
exports.loginDetails = exports.regDetails = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = __importStar(require("../utils/utils"));
const uuid_1 = require("uuid");
const _ = require("lodash");
// Registration
function regDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const pathName = path_1.default.join(__dirname, "userdata.json");
        try {
            // check if database exists
            //if it does not exist
            const fileExist = fs.existsSync(pathName);
            if (!fileExist) {
                user.id = (0, uuid_1.v4)();
                const newUser = _.pick(user, [
                    "id",
                    "fullname",
                    "username",
                    "email",
                    "password",
                ]);
                newUser.password = yield (0, utils_1.hashPassword)(newUser.password);
                fs.writeFileSync(pathName, JSON.stringify([newUser], null, 2));
                //return data to user
                const uUser = _.pick(user, ["id", "fullname", "email"]);
                const dataObj = { value: uUser, error: null };
                return dataObj;
            }
            //if it exists;
            if (fileExist) {
                const readDb = yield (0, utils_1.default)(pathName);
                const dataBaseObj = JSON.parse(readDb);
                ///check if user already exist
                const userExist = dataBaseObj.findIndex((item) => {
                    return item.email === user.email;
                });
                if (userExist !== -1) {
                    throw new Error("User already exist");
                }
                //else check for if the array is empty!
                if (dataBaseObj.length === 0) {
                    user.id = (0, uuid_1.v4)();
                    //write to database
                    const newUser = _.pick(user, [
                        "id",
                        "fullname",
                        "username",
                        "email",
                        "password",
                    ]);
                    newUser.password = yield (0, utils_1.hashPassword)(newUser.password); //---
                    dataBaseObj.push(newUser);
                    fs.writeFileSync(pathName, JSON.stringify(dataBaseObj, null, 2));
                    //return data to user
                    const uUser = _.pick(user, ["id", "fullname", "email"]);
                    const dataObj = { value: uUser, error: null };
                    return dataObj;
                }
                //update user id and write back to database
                user.id = (0, uuid_1.v4)();
                const newUser = _.pick(user, [
                    "id",
                    "fullname",
                    "username",
                    "email",
                    "password",
                ]);
                newUser.password = yield (0, utils_1.hashPassword)(newUser.password); //---
                dataBaseObj.push(newUser);
                fs.writeFileSync(pathName, JSON.stringify(dataBaseObj, null, 2));
                //return data to user;
                const uUser = _.pick(user, ["id", "fullname", "email"]);
                // console.log(uUser);
                const dataObj = { value: uUser, error: null };
                return dataObj;
            }
        }
        catch (err) {
            const pathName = path_1.default.join(__dirname, "userdata.json");
            const fileExist = fs.existsSync(pathName);
            if (!fileExist) {
                if (err) {
                    //update user
                    // user.id = 1;
                    const newUser = _.pick(user, [
                        "id",
                        "fullname",
                        "username",
                        "email",
                        "password",
                    ]);
                    newUser.password = yield (0, utils_1.hashPassword)(newUser.password); //----
                    //write back to database
                    fs.writeFileSync(pathName, JSON.stringify([newUser], null, 2));
                    const uUser = _.pick(user, ["id", "fullname", "email"]); //lodash;
                    //return data to user
                    const dataObj = { value: uUser, error: null };
                    return dataObj;
                }
                else {
                    const dataObj = { value: null, error: err };
                    return dataObj;
                }
            }
            console.error(err);
            const dataObj = { value: null, error: err };
            return dataObj;
        }
    });
}
exports.regDetails = regDetails;
//verifylogin;
function loginDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const pathName = path_1.default.join(__dirname, "userdata.json");
        try {
            const readDb = yield (0, utils_1.default)(pathName);
            const dataBaseObj = JSON.parse(readDb);
            const userData = dataBaseObj.find((item) => {
                return item.email === user.email;
            });
            return userData;
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.loginDetails = loginDetails;
