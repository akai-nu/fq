"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = __importDefault(require("../controllers/auth.controllers"));
const router = express_1.default.Router();
router.route("/sign-up").post(auth_controllers_1.default.signUp);
router.route("/login").get(auth_controllers_1.default.login);
const authRoutes = router;
exports.default = authRoutes;
//# sourceMappingURL=auth.routes.js.map