const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["text-input", "star-rating"],
    required: true,
  },
});

const overallRating = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["text-input", "star-rating"],
      required: true,
    },
  },
  { _id: false }
);

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "active"],
      default: "draft",
    },
    description: {
      type: String,
      required: true,
    },
    response: {
      type: Number,
      default: 0,
    },
    questions: [questionSchema],
    overallRating: overallRating,
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeedbackForm", formSchema);
