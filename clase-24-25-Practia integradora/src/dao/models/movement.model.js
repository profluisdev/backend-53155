import mongoose from "mongoose";

const movementCollection = "movement";

const movementSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  description: { type: String, default: "" },
  amount: {type: Number, required: true},
  type: { type: String, required: true },
  originAccountId: { type: String, required: true },
  destinationAccountId: { type: String },
  userId: { type: String },
});

export const movementModel = mongoose.model(movementCollection, movementSchema);
