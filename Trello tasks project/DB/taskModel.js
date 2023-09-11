import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["toDo", "Doing", "Done"],
      default: "toDo",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deadLine: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const taskModel = mongoose.model("Task", taskSchema);
export default taskModel;
