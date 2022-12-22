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
const db_1 = __importDefault(require("../config/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const MessageHelper_1 = __importDefault(require("../helpers/MessageHelper"));
const password_validator_1 = __importDefault(require("password-validator"));
const EmailValidator = __importStar(require("email-validator"));
const PasswordHelper_1 = require("../helpers/PasswordHelper");
const maxAge = 7 * 24 * 60 * 60 * 1000;
const createToken = (user) => {
    return jsonwebtoken_1.default.sign({
        user: user,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: maxAge });
};
const authControllers = {
    signUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { displayName, email, profession, research_location, password } = req.body;
        const user_id = (0, uuid_1.v4)();
        const hashedPassword = yield (0, PasswordHelper_1.hashPassword)(password);
        const pswdSchema = new password_validator_1.default();
        pswdSchema.is().min(8);
        pswdSchema.has().uppercase().lowercase().digits(2);
        const query = `INSERT INTO users VALUES ("${user_id}", "${displayName}", "${email}", "${profession}", "${research_location}", "${hashedPassword}")`;
        if (!displayName || !email || !profession || !research_location || !password) {
            res.status(400).send({
                message: MessageHelper_1.default.empty_fields
            });
        }
        //TODO: displayName eq firstname + lastname
        if (displayName.length < 5) {
            res.status(400).send({
                message: MessageHelper_1.default.length_error
            });
        }
        if (!EmailValidator.validate(email)) {
            res.status(400).send({
                message: MessageHelper_1.default.email_error
            });
        }
        if (!pswdSchema.validate(password)) {
            res.status(400).send({
                message: MessageHelper_1.default.password_error
            });
        }
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
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const query = `SELECT * from users WHERE (email = "${email}") AND (password = "${password}")`;
        try {
            const [user, _] = yield db_1.default.execute(query);
            const token = createToken(user[0]);
            res.cookie("fq-jwt", token, { httpOnly: true, maxAge });
            res.status(200).send(user[0]);
        }
        catch (err) {
            res.status(400).send({
                message: err.message
            });
        }
    })
};
exports.default = authControllers;
//# sourceMappingURL=auth.controllers.js.map