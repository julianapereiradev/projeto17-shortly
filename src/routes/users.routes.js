import { Router } from "express";
import { validationSchema } from "../middlewares/validationSchema.middlewares.js";
import { getRanking, getUserMe, logout, signin, signup } from "../controllers/users.controllers.js";
import { signinSchema, signupSchema } from "../schemas/users.schemas.js";
import { validationAuth } from "../middlewares/validationAuth.middlewares.js";

const userRouter = Router()
userRouter.post("/signup", validationSchema(signupSchema), signup);
userRouter.post("/signin", validationSchema(signinSchema), signin);
userRouter.get("/users/me", validationAuth, getUserMe);
userRouter.get("/ranking", getRanking);
userRouter.delete('/logout', validationAuth, logout)

export default userRouter