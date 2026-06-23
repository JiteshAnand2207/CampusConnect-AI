import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema(
  {
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
      type: String,
      required: [true, "Solution description is required"],
      trim: true,
      minlength: [5, "Solution must be at least 5 characters long"],
    },

    attachments: [
      {
        type: String,
      },
    ],

    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isAccepted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Solution = mongoose.model("Solution", solutionSchema);

export default Solution;