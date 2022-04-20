import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  wallet: { type: String, unique: true },
  email: { type: String, unique: true, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
