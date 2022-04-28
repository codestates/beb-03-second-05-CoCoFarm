import mongoose from "mongoose";

const { Schema } = mongoose;

const votePostSchema = new Schema({
  url: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  authorId: { type: String },
  title: { type: String, required: true },
  content: { type: String, required: true },
  agreeVoters: [{ type: String }],
});

const votePost = mongoose.model("VotePost", votePostSchema);
export default votePost;
