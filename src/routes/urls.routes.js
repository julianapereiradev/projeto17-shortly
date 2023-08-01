import { Router } from "express";
import { validationschema } from "../middlewares/validationschema.middleware.js";
import {  postUrl, getUrlById, redirectUrl, deleteUrlById } from "../controllers/urls.controllers.js";
import { urlSchema } from "../schemas/urls.schemas.js";

const urlRouter = Router()
urlRouter.post("/urls/shorten", validationschema(urlSchema), postUrl);
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", redirectUrl);
urlRouter.delete("/urls/:id", deleteUrlById);

export default urlRouter