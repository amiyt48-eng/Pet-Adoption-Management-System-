import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: String,
    species: String,
    breed: String,
    age: Number,
    description: String,
    image: String,
    status: {
      type: String,
      enum: ["Available", "Pending", "Adopted"],
      default: "Available"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Pet", petSchema);
