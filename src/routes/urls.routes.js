import { Router } from "express";
import { validationSchema } from "../middlewares/validationSchema.middlewares.js";
import {  postUrl, getUrlById, redirectUrl, deleteUrlById } from "../controllers/urls.controllers.js";
import { urlSchema } from "../schemas/urls.schemas.js";
import { validationAuth } from "../middlewares/validationAuth.middlewares.js";


const urlRouter = Router()
urlRouter.post("/urls/shorten", validationAuth, validationSchema(urlSchema), postUrl);
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", redirectUrl);
urlRouter.delete("/urls/:id", validationAuth, deleteUrlById);

export default urlRouter