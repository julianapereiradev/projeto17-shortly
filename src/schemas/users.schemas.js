import joi from "joi";

export const signupSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().trim().required(),
    password: joi.string().required()
  });
  
  export const signinSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().required()
  });