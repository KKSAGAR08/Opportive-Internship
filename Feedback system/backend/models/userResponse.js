const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  qid: {
    type: String,
    required: true
  },
  qtype: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

const feedbackSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeedbackForm',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  responses: [responseSchema],   
  overallRating: responseSchema  
}, { timestamps: true });

module.exports = mongoose.model('FeedbackResponse', feedbackSchema);
