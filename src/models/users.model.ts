import * as fs from "fs";
import path from "path";
import readDataFile, { hashPassword } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";
const _ = require("lodash");

// Registration
export async function regDetails(user: Register) {
  const pathName: string = path.join(__dirname, "userdata.json");
  try {
    // check if database exists
    //if it does not exist
    const fileExist = fs.existsSync(pathName);
    if (!fileExist) {
      user.id = uuidv4();

      const newUser = _.pick(user, [
        "id",
        "fullname",
        "username",
        "email",
        "password",
      ]);
      newUser.password = await hashPassword(newUser.password);

      fs.writeFileSync(pathName, JSON.stringify([newUser], null, 2));
      //return data to user
      const uUser = _.pick(user, ["id", "fullname", "email"]);
      const dataObj = { value: uUser, error: null };
      return dataObj;
    }
    //if it exists;
    if (fileExist) {
      const readDb = await readDataFile(pathName);
      const dataBaseObj: Register[] = JSON.parse(readDb);

      ///check if user already exist
      const userExist: number = dataBaseObj.findIndex((item) => {
        return item.email === user.email;
      });
      if (userExist !== -1) {
        throw new Error("User already exist");
      }
      //else check for if the array is empty!
      if (dataBaseObj.length === 0) {
        user.id = uuidv4();
        //write to database
        const newUser = _.pick(user, [
          "id",
          "fullname",
          "username",
          "email",
          "password",
        ]);
        newUser.password = await hashPassword(newUser.password); //---
        dataBaseObj.push(newUser);
        fs.writeFileSync(pathName, JSON.stringify(dataBaseObj, null, 2));
        //return data to user
        const uUser = _.pick(user, ["id", "fullname", "email"]);
        const dataObj = { value: uUser, error: null };
        return dataObj;
      }
      //update user id and write back to database
      user.id = uuidv4();
      const newUser = _.pick(user, [
        "id",
        "fullname",
        "username",
        "email",
        "password",
      ]);
      newUser.password = await hashPassword(newUser.password); //---
      dataBaseObj.push(newUser);
      fs.writeFileSync(pathName, JSON.stringify(dataBaseObj, null, 2));
      //return data to user;
      const uUser = _.pick(user, ["id", "fullname", "email"]);
      // console.log(uUser);
      const dataObj = { value: uUser, error: null };
      return dataObj;
    }
  } catch (err) {
    const pathName: string = path.join(__dirname, "userdata.json");
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
        newUser.password = await hashPassword(newUser.password); //----
        //write back to database
        fs.writeFileSync(pathName, JSON.stringify([newUser], null, 2));
        const uUser = _.pick(user, ["id", "fullname", "email"]); //lodash;
        //return data to user
        const dataObj = { value: uUser, error: null };
        return dataObj;
      } else {
        const dataObj = { value: null, error: err };
        return dataObj;
      }
    }
    console.error(err);
    const dataObj = { value: null, error: err };
    return dataObj;
  }
}

//verifylogin;
export async function loginDetails(user: Login) {
  const pathName: string = path.join(__dirname, "userdata.json");
  try {
    const readDb = await readDataFile(pathName);
    const dataBaseObj: Register[] = JSON.parse(readDb);
    const userData = dataBaseObj.find((item) => {
      return item.email === user.email;
    });
    return userData;
  } catch (err) {
    console.error(err);
  }
}
