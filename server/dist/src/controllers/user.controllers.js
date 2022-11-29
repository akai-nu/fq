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
const uuid_1 = require("uuid");
const userControllers = {
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let query = "SELECT * from users";
        try {
            const [result, _] = yield db_1.default.execute(query);
            if (result) {
                res.status(200).send(result);
            }
        }
        catch (err) {
            res.status(400).send(err.message);
        }
    }),
    getUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let user_id = req.params.id;
        let query = `SELECT * from users WHERE user_id = "${user_id}"`;
        try {
            const [result, _] = yield db_1.default.execute(query);
            if (result) {
                res.status(200).send(result[0]);
            }
        }
        catch (err) {
            res.status(400).send(err.message);
        }
    }),
    // NOTES change to AUTHCONTROLLER
    addNewUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let { displayName, email, profession, research_location, password } = req.body;
        let user_id = (0, uuid_1.v4)();
        let query = `INSERT INTO users VALUES ("${user_id}", "${displayName}", "${email}", "${profession}", "${research_location}", "${password}")`;
        try {
            yield db_1.default.execute(query);
            res.status(201).send("User has been successfully created 🙂");
        }
        catch (err) {
            res.status(400).send(err.message);
        }
    }),
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let user_id = req.params.id;
        let { displayName, email, profession, research_location, password } = req.body;
        let query = `UPDATE users SET displayName = "${displayName}", email = "${email}", profession = "${profession}", research_location = "${research_location}", password = "${password}" WHERE user_id = "${user_id}"`;
        try {
            yield db_1.default.execute(query);
            res.status(200).send("User has been successfully updated 🙂");
        }
        catch (err) {
            res.status(400).send(err.message);
        }
    })
};
exports.default = userControllers;
// exports.getAllUsers = async (req: Request, res: Response) => {
//     let query = "SELECT * from users";
//     try {
//         const [result, _] = await db.execute(query);
//         if (result) {
//             res.status(200).send(result)
//         }
//     } catch (err) {
//         res.status(400).send(err.message)
//     }
// };
// exports.getUserById = async (req: Request, res: Response) => {
//     let user_id = req.params.id;
//     let query = `SELECT * from users WHERE user_id = "${user_id}"`;
//     try {
//         const [result, _] = await db.execute(query);
//         if (result) {
//             res.status(200).send(result[0])
//         }
//     } catch (err) {
//         res.status(400).send(err.message)
//     }
// };
// exports.addNewUser = async (req: Request, res: Response) => {
//     let {displayName, email, profession, research_location, password} = req.body;
//     let user_id = uuidv4();
//     let query = `INSERT INTO users VALUES ("${user_id}", "${displayName}", "${email}", "${profession}", "${research_location}", "${password}")`;
//     try {
//         await db.execute(query);
//         res.status(201).send("User has been successfully created 🙂");
//     } catch (err) {
//         res.status(400).send(err.message);
//     }
// }
// exports.updateUser = async (req: Request, res: Response) => {
//     let user_id = req.params.id;
//     let {displayName, email, profession, research_location, password}= req.body;
//     let query = `UPDATE users SET displayName = "${displayName}", email = "${email}", profession = "${profession}", research_location = "${research_location}", password = "${password}" WHERE user_id = "${user_id}"`;
//     try {
//         await db.execute(query);
//         res.status(200).send("User has been successfully updated 🙂");
//     } catch (err) {
//         res.status(400).send(err.message);
//     }
// }
//# sourceMappingURL=user.controllers.js.map