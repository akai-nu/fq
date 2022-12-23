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
const db_1 = __importDefault(require("../config/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const MessageHelper_1 = __importDefault(require("../helpers/MessageHelper"));
const AuthHelper_1 = require("../helpers/AuthHelper");
const maxAge = 7 * 24 * 60 * 60 * 1000;
const createToken = (user) => {
    return jsonwebtoken_1.default.sign({
        user: user,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: maxAge });
};
const authControllers = {
    signUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, firstname, email, profession, research_location, password } = req.body;
        const displayName = `${firstname} ${name}`;
        const user_id = (0, uuid_1.v4)();
        const hashedPassword = yield (0, AuthHelper_1.hashPassword)(password);
        const query = `INSERT INTO users VALUES ("${user_id}", "${displayName}", "${email}", "${profession}", "${research_location}", "${hashedPassword}")`;
        if (!name || !firstname || !email || !profession || !research_location || !password) {
            res.status(400).send({
                message: MessageHelper_1.default.empty_fields
            });
        }
        else if (displayName.length < 5) {
            res.status(400).send({
                message: MessageHelper_1.default.length_error
            });
        }
        else if (!(0, AuthHelper_1.validateEmail)(email)) {
            res.status(400).send({
                message: MessageHelper_1.default.email_error
            });
        }
        else if (!(0, AuthHelper_1.validatePassword)(password)) {
            res.status(400).send({
                message: MessageHelper_1.default.password_error
            });
        }
        else {
            try {
                yield db_1.default.execute(query);
                res.status(201).json({
                    message: MessageHelper_1.default.add_user_succeeded
                });
            }
            catch (err) {
                res.status(400).send({
                    message: err.message
                });
            }
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const query = `SELECT * from users WHERE (email = "${email}")`;
        if (!email || !password) {
            res.status(400).send({
                message: MessageHelper_1.default.login_error
            });
        }
        else {
            try {
                const [user, _] = yield db_1.default.execute(query);
                if (!user[0]) {
                    res.status(400).send({
                        message: MessageHelper_1.default.login_error
                    });
                }
                else {
                    const isPasswordMatch = yield (0, AuthHelper_1.comparePassword)(password, user[0].password);
                    if (!isPasswordMatch) {
                        res.status(400).send({
                            message: MessageHelper_1.default.login_error
                        });
                    }
                    else {
                        const token = createToken(user[0]);
                        res.cookie("fq-jwt", token, { httpOnly: true, maxAge });
                        res.status(200).send(user[0]);
                    }
                }
            }
            catch (err) {
                res.status(400).send({
                    message: err.message
                });
            }
        }
    }),
};
exports.default = authControllers;
//# sourceMappingURL=auth.controllers.js.map