import mongoose from "mongoose";

export const TransactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Deposit", "Withdrawal", "Transfer"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  targetAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});
