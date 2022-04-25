import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [
    {
      author: { type: String, required: true },
      comment: { type: String, required: true },
    },
  ],
  wholiked: [{ type: String }],
});
const Post = mongoose.model("Post", postSchema);
export default Post;
