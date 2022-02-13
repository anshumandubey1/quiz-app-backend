const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    options: {
      type: [String]
    },
    answer: String
  },
  { timestamps: true },
  { collection: 'questions' }
);

module.exports = mongoose.model('questions', QuestionSchema);
