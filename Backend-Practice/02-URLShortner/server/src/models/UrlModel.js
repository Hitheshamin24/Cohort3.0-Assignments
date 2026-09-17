import mongoose, { model, Schema } from "mongoose";

const UrlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
  },
  click: {
    type: Number,
    default: 0,
  },
});

const UrlModel = mongoose.model("URL_Model", UrlSchema);
export default UrlModel;
