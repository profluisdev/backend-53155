import mongoose from "mongoose";

const accountCollection = "account";

const accountSchema = new mongoose.Schema({
  number: { type: String, required: true },
  alias: { type: String, required: true },
  balance: { type: Number, default: 0 },
  userId: { type: String, default: null },
});

export const accountModel = mongoose.model(accountCollection, accountSchema);
