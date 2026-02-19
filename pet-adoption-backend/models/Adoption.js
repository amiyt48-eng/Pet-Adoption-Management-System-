import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Adoption", adoptionSchema);
