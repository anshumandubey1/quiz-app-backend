const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    avatar_url: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'student',
      enum: ['student', 'teacher', 'admin']
    }
  },
  { timestamps: true },
  { collection: 'users' }
);

UserSchema.index({ email: 1 });

UserSchema.statics.findByEmail = (email) => {
  return this.findOne({ email });
};

module.exports = mongoose.model('users', UserSchema);
