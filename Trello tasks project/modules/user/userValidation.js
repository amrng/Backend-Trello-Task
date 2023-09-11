import Joi from "joi";

let signUpValidationSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(8).required(),

  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required(),

  password: Joi.string()
    .pattern(/^[A-Za-z0-9]{3,30}$/)
    .required(),

  age: Joi.number().min(18).max(55),
  gender: Joi.string().valid("male", "female"),
  phone: Joi.string(),
  isVerified: Joi.boolean().default(false),
  isDeleted: Joi.boolean().default(false),
  firstName: Joi.string(),
  lastName: Joi.string(),
  role: Joi.string().valid("user", "manager").default("user"),
});

let signInSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string()
    .pattern(/^[A-Za-z0-9]{3,30}$/)
    .required(),
});

export { signUpValidationSchema, signInSchema };
