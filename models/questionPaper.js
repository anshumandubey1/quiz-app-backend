const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionPaperSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users'
    },
    authorsAllowed: [String],
    studentsAllowed: {
      type: [String],
      default: []
    },
    title: {
      type: String,
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    duration: {
      type: Number,
      default: 0
    },
    positiveMarking: {
      type: Number,
      default: 1
    },
    negativeMarking: {
      type: Number,
      default: 0
    },
    isLive: {
      type: Boolean,
      default: false
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions'
      }
    ],
    tags: {
      type: [String],
      default: []
    }
  },
  { timestamps: true },
  { collection: 'questionPapers' }
);

QuestionPaperSchema.index({ authorsAllowed: 1 });
QuestionPaperSchema.index({ studentsAllowed: 1 });
QuestionPaperSchema.index({ tags: 1 });

QuestionPaperSchema.statics.getQuestionPapersByStudentEmail = (email) => {
  return this.find({ studentsAllowed: email, isLive: true });
};

QuestionPaperSchema.statics.getQuestionPapersByTeacherEmail = (email) => {
  return this.find({ authorsAllowed: email });
};

QuestionPaperSchema.statics.getQuestionPapersByTags = (tags) => {
  return this.find({ tags: { $all: tags } });
};

module.exports = mongoose.model('questionPapers', QuestionPaperSchema);
