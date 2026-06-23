import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Problem title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters long"],
    },

    description: {
      type: String,
      required: [true, "Problem description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
    },

    category: {
      type: String,
      required: [true, "Problem category is required"],
      enum: [
        "hostel",
        "mess",
        "academic",
        "transport",
        "technical",
        "lost_found",
        "event",
        "campus",
        "other",
      ],
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },

    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

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

    acceptedSolution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Solution",
    },
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;