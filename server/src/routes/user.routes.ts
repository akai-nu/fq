import express from "express";
import userControllers from "../controllers/user.controllers";

const router = express.Router();

router.route("/").get(userControllers.getAllUsers).post(userControllers.addNewUser);
router.route("/:id").get(userControllers.getUserById).put(userControllers.updateUser);


const userRoutes = router;

export default userRoutes;

