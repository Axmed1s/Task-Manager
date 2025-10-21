const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'must provide name'],
      trim: true,
      maxlength: [20, 'name can not be more than 20 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      index:true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
