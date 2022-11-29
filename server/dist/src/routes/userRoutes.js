"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const router = express_1.default.Router();
router.route("/").get(userControllers_1.default.getAllUsers).post(userControllers_1.default.addNewUser);
router.route("/:id").get(userControllers_1.default.getUserById).put(userControllers_1.default.updateUser);
const userRoutes = router;
exports.default = userRoutes;
//# sourceMappingURL=userRoutes.js.map