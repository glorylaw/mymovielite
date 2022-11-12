import { Request, Response } from "express";
import {
  validateUserRegInput,
  validateLoginInput,
  generateToken,
} from "../utils/utils";
import { regDetails, loginDetails } from "../models/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(req: Request, res: Response) {
  try {
    let user: Register = {
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    //validate user input and check and errors
    const { error } = await validateUserRegInput(user);
    if (error) {
      const err = error.details[0].message;
      return res.status(400).render("error", { error: err });
    }
    const userData = await regDetails(user);

    if (userData?.error) {
      return res.status(500).json({ error: "User already exists" });
    } else {
      return res.status(201).redirect("/movie/movies")
    }
  } catch (error) {
    console.log(error);
  }
}

export async function logIn(req: Request, res: Response) {
  try {
    const user: Login = {
      email: req.body.email,
      password: req.body.password,
    };
    const { error } = await validateLoginInput(user)
    if (!error) {
      const dataObj = await loginDetails(user)
      if (dataObj && (await bcrypt.compare(user.password, dataObj.password))) {
        //cookie/token
        const token = await generateToken(`${dataObj.id}`) // generate token
        //save token inside cookie
        res.cookie('token', token)
        return res.status(200).redirect('/movie/movies')
      } else {
        res.status(400)
        throw new Error('Invalid emailaddress or password')
      }
    }
  } catch (err) {
    res.render("error", { error: err });
  }
}
