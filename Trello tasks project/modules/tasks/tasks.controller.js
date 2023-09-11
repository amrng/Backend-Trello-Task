import userModel from "../../DB/userModel.js";
import taskModel from "../../DB/taskModel.js";

// Add New Task By MANAGER only
const addTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { assignTo } = req.body;
    const founded = await userModel.findById({ _id: id });
    const assigningTo = await userModel.findById(assignTo);
    if (!founded && founded.isDeleted == true && founded.isVerified == false)
      return res
        .status(400)
        .json({ message: "User Not Founded please signUp" });
    if (founded.role != "manager")
      return res
        .status(402)
        .json({ message: "You dont have a premession", err });
    if (!assigningTo)
      return res.status(400).json({
        message: "User you trying to addmit task to is not found",
      });
    if (assigningTo) {
      const { title, description, assignTo, deadLine } = req.body;
      let addTask = await taskModel.create({
        title,
        description,
        userId: id,
        assignTo,
        deadLine,
      });
      return res
        .status(200)
        .json({ message: `Task Added to ${assTo.userName}`, addTask });
    }
  } catch {
    (err) =>
      res
        .status(404)
        .json({ error: "Something went wrong while adding the task", err });
  }
};

// Update Task (Title, Discription, Status) By Manager only
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const founded = await userModel.findById({ _id: id });
    if (
      founded &&
      founded.isDeleted == false &&
      founded.isVerified == true &&
      founded.role == "manager"
    ) {
      const { _id, title, description, status } = req.body;
      let update = await taskModel.findById(_id);
      if (update) {
        let updatedTask = await taskModel.findByIdAndUpdate(
          { _id: _id },
          { title, description, status },
          { new: true }
        );
        return res.status(201).json({ message: "Task Updated", updatedTask });
      } else {
        return res.status(400).json({ message: "Task not exist" });
      }
    } else {
      return res.status(402).json({ message: "You dont have a premession" });
    }
  } catch {
    (err) =>
      res
        .status(404)
        .json({ error: "Something went wrong while updating the task", err });
  }
};

// Delete Task By Manager only
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const founded = await userModel.findById({ _id: id });
    if (
      founded &&
      founded.isDeleted == false &&
      founded.isVerified == true &&
      founded.role == "manager"
    ) {
      const { _id } = req.body;
      let deleted = await taskModel.findById(_id);
      if (deleted) {
        let deletedTask = await taskModel.findByIdAndDelete(_id);
        return res.status(201).json({ message: "Task Deleted" });
      } else {
        return res.status(400).json({ message: "Task not exist" });
      }
    } else {
      return res.status(402).json({ message: "You dont have a premession" });
    }
  } catch {
    (err) =>
      res
        .status(404)
        .json({ error: "Something went wrong while updating the task", err });
  }
};

// Get ALl Tasks With user Data
const tasksWithUserData = async (req, res) => {
  try {
    let allTasks = await taskModel.find().populate("assignTo");
    return res
      .status(202)
      .json({ message: "Here are All Tasks With Users Data", allTasks });
  } catch {
    (err) =>
      res.status(404).json({ error: "Something went wrong while search", err });
  }
};

// Get Tasks Not Done or after Deadline
const tasksNotDone = async (req, res) => {
  try {
    let tasksNotDone = await taskModel.find({
      $and: [
        { status: { $in: ["toDo", "Doing"] } },
        { deadLine: { $lt: Date.now() } },
      ],
    });
    return res
      .status(202)
      .json({ message: "Here are All Tasks With Users Data", tasksNotDone });
  } catch {
    (err) =>
      res.status(404).json({ error: "Something went wrong while search", err });
  }
};

export { addTask, updateTask, deleteTask, tasksWithUserData, tasksNotDone };
