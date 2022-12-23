import express from "express";
import authControllers from "../controllers/auth.controllers";

const router = express.Router();

router.route("/sign-up").post(authControllers.signUp);
router.route("/login").post(authControllers.login);

const authRoutes = router;

export default authRoutes;

