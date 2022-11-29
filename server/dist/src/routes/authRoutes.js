"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const db_1 = __importDefault(require("../config/db"));
const uuid_1 = require("uuid");
const router = express_1.default.Router();
router.post("/sign-up", authMiddleware_1.default.validateRegister, (req, res, next) => {
    let { displayName, email, profession, research_location, password } = req.body;
    let user_id = (0, uuid_1.v4)();
    db_1.default.query(`SELECT user_id FROM users WHERE LOWER(email) = LOWER(${email})`, (err, result) => {
        if (result.length) {
            return res.status(409).send({
                message: "This email is already in use !"
            });
        }
        else {
            bcryptjs_1.default.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).send({
                        message: err
                    });
                }
                else {
                    db_1.default.query(`INSERT INTO users VALUES ("${user_id}", "${displayName}", "${email}", "${profession}", "${research_location}", "${hash}")`, (err, result) => {
                        if (err) {
                            return res.status(400).send({
                                message: err
                            });
                        }
                        return res.status(201).send({
                            message: "Registered 🙂"
                        });
                    });
                }
            });
        }
    });
});
router.post("/login", (req, res, next) => {
    db_1.default.query(`SELECT * FROM users WHERE email = ${req.body.email}`, (err, result) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        }
        if (!result.length) {
            return res.status(400).send({
                message: "Email or password incorrect !"
            });
        }
        bcryptjs_1.default.compare(req.body.password, result[0]["password"], (passErr, passResult) => {
            if (passErr) {
                return res.status(400).send({
                    message: "Email or password incorrect 😢"
                });
            }
            if (passResult) {
                const token = jsonwebtoken_1.default.sign({
                    email: result[0].email,
                    userId: result[0].user_id
                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
                return res.status(200).send({
                    message: "Logged In 🙂",
                    token,
                    user: result[0]
                });
            }
            return res.status(400).send({
                message: "Email or password incorrect 😢"
            });
        });
    });
});
const authRoutes = router;
exports.default = authRoutes;
//# sourceMappingURL=authRoutes.js.map