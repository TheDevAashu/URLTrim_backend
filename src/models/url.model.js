import mongoose from "mongoose";

const URlSchema = mongoose.Schema(
  {
    longUrl: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true
    },
  },
  {
    timestamps: true,
  }
);

const Url = mongoose.model('Url', URlSchema);

export default Url;