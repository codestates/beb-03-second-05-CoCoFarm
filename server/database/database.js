import mongoose from "mongoose";
import { config } from "../config.js";
const url =
  "mongodb+srv://cocoFarm:E2TvaslMTS0amrux@cluster0.7hmwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
export async function connectDB() {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
