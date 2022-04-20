import mongoose from "mongoose";
import { config } from "../config.js";
const url =
  "mongodb+srv://cocofarm:sfQchF754tozFXYK@cluster0.7hmwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
export async function connectDB() {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
