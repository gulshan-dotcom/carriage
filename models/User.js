import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  receivingPhone: String,
  payingPhone: String,
  referrer: { type: String, default: null },
  wallet: { type: Number, default: 0 },
  plan: {
    active: { type: Number, default: 1 },
    pending: { type: Number, default: 0 },
  },
  today: {
    date: Date,
    quota: Number,
  },
  withdraw: { amount: { type: Number, default: 0 }, source: String },
  pendingWithdraw: Number,
  earned: Number,
  limit: { type: Number, default: 490 },
  history: [
    {
      source: String,
      isPending: { type: Boolean, default: true },
      description: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  messages: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function () {
  this.updatedAt = Date.now();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
