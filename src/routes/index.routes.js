import { Router } from "express";
import userRouter from "./users.routes.js";
import urlRouter from "./urls.routes.js";


const router = Router();

router.use(userRouter)
router.use(urlRouter)


export default router;