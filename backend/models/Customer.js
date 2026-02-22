import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    company: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);