require("dotenv").config();
import express from "express" 
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import authMiddleware from "./middlewares/auth.middleware";
import userRoutes from "./routes/user.routes";

const main = () => {
    const PORT = process.env.PORT || 5000;
    const app = express();
    
    // const corsOptions = {
    //     origin: process.env.CLIENT_URL || "http://127.0.0.1:5173"
    // };
        
    //TODO: Add cors options
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    
    app.get("*", authMiddleware.checkUser);
    app.get("/jwtid", authMiddleware.requireAuth, (req, res) => {
      res.status(200).send(res.locals.user.user_id);
    });
    
    app.use(express.json());
    app.use(`/api/v2/auth`, authRoutes);
    app.use(`/api/v2/users`, userRoutes);
    
    app.listen(PORT, () => console.log(`🚀 Server is runnning: http://localhost:${PORT}`));

}

main();

// BUG On bad request server not restart
