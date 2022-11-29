import { Request, Response, NextFunction } from "express";
import db from "../config/db";
import { v4 as uuidv4 } from "uuid";

const userControllers = {
    getAllUsers : async (req: Request, res: Response) => {
        let query = "SELECT * from users";
    
        try {
            const [result, _] = await db.execute(query);
    
            if (result) {
                res.status(200).send(result)
            }
        } catch (err) {
            res.status(400).send(err.message)
        }
    },

    getUserById: async (req: Request, res: Response) => {
        let user_id = req.params.id;
        let query = `SELECT * from users WHERE user_id = "${user_id}"`;
    
        try {
            const [result, _] = await db.execute(query);
    
            if (result) {
                res.status(200).send(result[0])
            }
        } catch (err) {
            res.status(400).send(err.message)
        }
    },


    // NOTES change to AUTHCONTROLLER
    addNewUser: async (req: Request, res: Response) => {
        let {displayName, email, profession, research_location, password} = req.body;
        let user_id = uuidv4();
        let query = `INSERT INTO users VALUES ("${user_id}", "${displayName}", "${email}", "${profession}", "${research_location}", "${password}")`;
    
        try {
            await db.execute(query);
    
            res.status(201).send("User has been successfully created 🙂");
    
        } catch (err) {
            res.status(400).send(err.message);
        }
    },

    updateUser: async (req: Request, res: Response) => {
        let user_id = req.params.id;
        let {displayName, email, profession, research_location, password}= req.body;
    
        let query = `UPDATE users SET displayName = "${displayName}", email = "${email}", profession = "${profession}", research_location = "${research_location}", password = "${password}" WHERE user_id = "${user_id}"`;
    
        try {
            await db.execute(query);
    
            res.status(200).send("User has been successfully updated 🙂");
    
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}

export default userControllers;


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


