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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const password_validator_1 = __importDefault(require("password-validator"));
const db_1 = __importDefault(require("../config/db"));
const pswdSchema = new password_validator_1.default();
pswdSchema.is().min(8);
pswdSchema.has().uppercase().lowercase().digits(2);
const authMiddleware = {
    checkUser: (req, res, next) => {
        const token = req.cookies.jwt;
        if (token) {
            jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    res.locals.user = null;
                    next();
                }
                else {
                    let query = `SELECT * FROM users WHERE user_id = ${decodedToken.userId}`;
                    let user = yield db_1.default.execute(query);
                    res.locals.user = user;
                    next();
                }
            }));
        }
        else {
            res.locals.user = null;
            next();
        }
    },
    requireAuth: (req, res, next) => {
        const token = req.cookies.jwt;
        if (token) {
            jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(decodedToken.userId);
                    next();
                }
            }));
        }
        else {
            console.log("No token");
        }
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map