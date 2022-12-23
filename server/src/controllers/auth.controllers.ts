import { Request, Response } from "express";
import db from "../config/db";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/IUser";
import { v4 as uuidv4 } from "uuid";
import MessageHelper from "../helpers/MessageHelper";
import { validateEmail, validatePassword, comparePassword, hashPassword } from "../helpers/AuthHelper";

const maxAge = 7 * 24 * 60 * 60 * 1000;

const createToken = (user: IUser) => {
    return jwt.sign(
        {
            user: user,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: maxAge }
    );
};

const authControllers = {
    signUp: async (req: Request, res: Response) => {
        const {name, firstname, email, profession, research_location, password} = req.body;

        const displayName = `${firstname} ${name}`;
        const user_id = uuidv4();
        const hashedPassword = await hashPassword(password);

        const query = `INSERT INTO users VALUES ("${user_id}", "${displayName}", "${email}", "${profession}", "${research_location}", "${hashedPassword}")`;

        if (!name || !firstname || !email || !profession || !research_location || !password) {
            res.status(400).send({
                message: MessageHelper.empty_fields
            });
        } else if (displayName.length < 5) {
            res.status(400).send({
                message: MessageHelper.length_error
            });
        } else if (!validateEmail(email)) {
            res.status(400).send({
                message: MessageHelper.email_error
            });
        } else if (!validatePassword(password)) {
            res.status(400).send({
                message: MessageHelper.password_error
            });
        } else {
            try {
                await db.execute(query);

                res.status(201).json({
                    message: MessageHelper.add_user_succeeded
                });

            } catch (err) {

                res.status(400).send({
                    message: err.message
                });
            }
        }    
    },

    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const query = `SELECT * from users WHERE (email = "${email}")`;

        if (!email || !password) {
            res.status(400).send({
                message: MessageHelper.login_error
            });
        } else {
            try {
                const [user, _] = await db.execute(query);

                if (!user[0]) {
                    res.status(400).send({
                        message: MessageHelper.login_error
                    });
                } else {
                    const isPasswordMatch = await comparePassword(password, user[0].password);
    
                    if (!isPasswordMatch) {
                        res.status(400).send({
                            message: MessageHelper.login_error
                        });
                    } else {
                        const token = createToken(user[0]);
                        res.cookie("fq-jwt", token, { httpOnly: true, maxAge });
                        res.status(200).send(user[0]);
                    }
                }
            } catch (err) {
                res.status(400).send({
                    message: err.message
                });
            }
        }
      },
};

export default authControllers;
