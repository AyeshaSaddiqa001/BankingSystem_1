// models/Account.js
import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  accountType: {
    type: String,
    enum: ["Personal", "Business"],
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Account ||
  mongoose.model("Account", AccountSchema);
