import express from "express";
const app = express();
const port = 3333;
import { initConnection } from "./DB/connection.js";
import userRoutes from "./modules/user/user.routes.js";
import taskRoutes from "./modules/tasks/tasks.routes.js";

initConnection();
app.use(express.json());
app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Global Error", err });
});

app.listen(port, () => console.log(`Server Connected On Port ${port} !`));