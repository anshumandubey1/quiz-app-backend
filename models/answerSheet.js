const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AnswerSheetSchema = new Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    questionPaper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'questionPapers'
    },
    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'questions'
        },
        answer: String,
        isVisited: {
          type: Boolean,
          default: false
        },
        submittedAt: Date
      }
    ],
    submittedAt: Date,
    finalScore: {
      type: Number,
      default: -1
    }
  },
  { timestamps: true },
  { collection: 'answerSheets' }
);

AnswerSheetSchema.index({ student_id: 1 });
AnswerSheetSchema.index({ questionPaper: 1 });

AnswerSheetSchema.statics.getStudentsAnswerSheet = (studentId) => {
  return this.find({ student: studentId })
    .select('-answers')
    .populate('questionPaper', '-questions');
};

AnswerSheetSchema.statics.getAnswerSheetsOfQuestionPaper = (
  questionPaperId
) => {
  return this.find({
    questionPaper: questionPaperId,
    finalScore: { $not: -1 }
  })
    .select('-answers')
    .populate('questionPaper', '-questions')
    .sort({
      finalScore: -1
    });
};

module.exports = mongoose.model('answerSheets', AnswerSheetSchema);
