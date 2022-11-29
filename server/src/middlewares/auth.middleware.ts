import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as EmailValidator from 'email-validator';
import passwordValidator from "password-validator";
import db from "../config/db";

const pswdSchema = new passwordValidator();

pswdSchema.is().min(8);
pswdSchema.has().uppercase().lowercase().digits(2);

const authMiddleware = {
    checkUser: (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.jwt;

        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
                if (err) {
                    res.locals.user = null;
                    next();
                  } else {
                    let query = `SELECT * FROM users WHERE user_id = "${decodedToken.user.user_id}"`;
                    let user = await db.execute(query);

                    res.locals.user = user;
                    next();
                  }
            })
        } else {
            res.locals.user = null;
            next();
        }
    },

    requireAuth: (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.jwt;
        if (token) {
          jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
              console.log(err);
            } else {
              console.log(decodedToken.user.user_id);
              next();
            }
          });
        } else {
          console.log("No token");
        }
    }
};
export default authMiddleware;