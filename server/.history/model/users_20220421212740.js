import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  // wallet: {
  //   address: { type: String, required: true, unique: true },
  //   privateKey: { type: String, required: true, unique: true },
  // },

  email: { type: String, unique: true, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const User = mongoose.model("User", userSchema);

export default User;
