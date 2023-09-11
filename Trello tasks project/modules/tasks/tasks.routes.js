import express from "express";
const taskRoutes = express.Router();
import { auth } from "../../middleware/task.auth.js";
import {
  addTask,
  updateTask,
  deleteTask,
  tasksWithUserData,
  tasksNotDone,
} from "./tasks.controller.js";

taskRoutes.post("/addTask/:id", auth, addTask);
taskRoutes.patch("/updateTask/:id", auth, updateTask);
taskRoutes.delete("/deleteTask/:id", auth, deleteTask);
taskRoutes.get("/tasksWithUserData", tasksWithUserData);
taskRoutes.get("/tasksNotDone", tasksNotDone);
export default taskRoutes;
