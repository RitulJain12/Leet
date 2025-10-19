const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
  {
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problems",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      required: true,
      enum: ["cpp", "java", "python", "javascript", "c","Kotlin","c#"], 
    },
    status: {
      type: String,
      enum: ["Accepted", "Wrong Answer", "TLE", "Runtime Error", "Compilation Error", "Pending"],
      default: "Pending",
    },
    time: {
      type: Number, // in milliseconds
      default: 0,
    },
    memory: {
      type: Number, // in KB or MB (consistent unit)
      default: 0,
    },
    runtime: {
      type: Date,
      default: Date.now,
    },
    errorMessage: {
      type: String,
      default: "",
    },
    testCasesPassed: {
      type: Number,
      default: 0,
    },
    totalTestCases: {
      type: Number,
      default: 0,
    },
    tokens: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Submission", SubmissionSchema);
