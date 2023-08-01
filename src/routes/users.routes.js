import { Router } from "express";
import { validationschema } from "../middlewares/validationschema.middleware.js";
import { getRanking, getUserMe, signin, signup } from "../controllers/users.controllers.js";
import { signinSchema, signupSchema } from "../schemas/users.schemas.js";

const userRouter = Router()
userRouter.post("/signup", validationschema(signupSchema), signup);
userRouter.post("/signin", validationschema(signinSchema), signin);
userRouter.get("/users/me", getUserMe);
userRouter.get("/ranking", getRanking);

export default userRouter