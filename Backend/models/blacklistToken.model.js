import mongoose from "mongoose";

const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24, // 24 hours
  },
});

// This TTL index will automatically delete the document 24 hours after `blacklistedAt`
const blacklistTokenModel = mongoose.model("BlacklistedToken", blacklistedTokenSchema);

export default blacklistTokenModel;
