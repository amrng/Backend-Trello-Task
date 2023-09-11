import mongoose from "mongoose";

export const initConnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/Treller_Tasks")
    .then(console.log("DataBase Connected !"))
    .catch((error) => console.log(error));
};
