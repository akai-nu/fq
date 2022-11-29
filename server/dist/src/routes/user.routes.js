"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
const router = express_1.default.Router();
router.route("/").get(user_controllers_1.default.getAllUsers).post(user_controllers_1.default.addNewUser);
router.route("/:id").get(user_controllers_1.default.getUserById).put(user_controllers_1.default.updateUser);
const userRoutes = router;
exports.default = userRoutes;
//# sourceMappingURL=user.routes.js.map