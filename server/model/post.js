import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: { type: String, required: true },
    },
  ],
});
const postModel = mongoose.model("Post", postSchema);
export default postModel;
