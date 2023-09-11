import Joi from "joi";

let taskValidationSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3).max(150).required(),
  status: Joi.string().valid("toDo", "Doing", "Done").default("toDo"),
});

export { taskValidationSchema };
