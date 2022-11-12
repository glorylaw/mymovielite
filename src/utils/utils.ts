import * as fs from "fs";
import { Stream } from "stream";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express, { Response, Request, NextFunction } from "express";

export default function readDataFile(filepath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let data: string = "";
    let readStream: Stream = fs.createReadStream(filepath, "utf8");
    //reading in chunks
    readStream.on("data", (chunk: string) => {
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

//---Validate registered user  details.
export async function validateUserRegInput(user: Register) {
  //define a schema;
  const schema = Joi.object({
    fullname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,1024}$"))
      .required(),
    confirmPassword: Joi.ref("password"),
  });

  return schema.validate(user);
}

//--Validate login users;
export async function validateLoginInput(user: Login) {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,1024}$"))
      .required(),
  });
  return schema.validate(user);
}

//hashing passwords
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

//generate token
export async function generateToken (id: string) {
  if (process.env.JWT_SECRET) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  }
};
//validate movie
export async function validateMovie(movie: Movie){
    //define a schema;
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string(),
    price: Joi.string().required(),
  });

  return schema.validate(movie);
}