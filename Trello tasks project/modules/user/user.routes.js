import express from "express";
const userRoutes = express.Router();
import validation from "../../middleware/validation.js";
import auth from "../../middleware/user.auth.js";
import { signUpValidationSchema, signInSchema } from "./userValidation.js";
import {
  signIn,
  signUp,
  verify,
  updateUserData,
  changePassword,
  deleteUser,
  softDelete,
  logOut,
} from "./user.controller.js";

userRoutes.post("/signUp", validation(signUpValidationSchema), signUp);
userRoutes.get("/verify/:token", verify);
userRoutes.post("/signIn", validation(signInSchema), signIn);
userRoutes.patch("/updateUser/:id", auth, updateUserData);
userRoutes.patch(
  "/changePass/:id",
  auth,
  validation(signInSchema),
  changePassword
);
userRoutes.delete("/delete/:id", auth, deleteUser);
userRoutes.patch("/softDelete/:id", auth, softDelete);
userRoutes.post("/logOut/:id", auth, logOut);

export default userRoutes;
