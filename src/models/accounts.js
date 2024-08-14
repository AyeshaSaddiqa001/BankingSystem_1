// models/Account.js
import mongoose from "mongoose";
import { TransactionSchema } from "./transaction";

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
  transactions: [TransactionSchema],
});

export default mongoose.models.Account ||
  mongoose.model("Account", AccountSchema);
