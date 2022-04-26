import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  nickName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wallet: {
    address: { type: String, required: true, unique: true },
    privateKey: { type: String, required: true, unique: true },
  },
  email: { type: String, unique: true, required: true },
  avartar: { type: String },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const User = mongoose.model("User", userSchema);

export default User;
