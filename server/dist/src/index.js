"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const main = () => {
    const PORT = process.env.PORT || 5000;
    const app = (0, express_1.default)();
    // const corsOptions = {
    //     origin: process.env.CLIENT_URL || "http://127.0.0.1:5173"
    // };
    //TODO: Add cors options
    app.use((0, cors_1.default)());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    app.get("*", auth_middleware_1.default.checkUser);
    app.get("/jwtid", auth_middleware_1.default.requireAuth, (req, res) => {
        res.status(200).send(res.locals.user.user_id);
    });
    app.use(express_1.default.json());
    app.use(`/api/v2/auth`, auth_routes_1.default);
    app.use(`/api/v2/users`, user_routes_1.default);
    app.listen(PORT, () => console.log(`🚀 Server is runnning: http://localhost:${PORT}`));
};
main();
// BUG On bad request server not restart
//# sourceMappingURL=index.js.map