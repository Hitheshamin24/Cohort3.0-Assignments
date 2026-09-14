import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    unique: [true, "Username should be unique"],
    required: true,
  },
  passWordHash: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,

  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
