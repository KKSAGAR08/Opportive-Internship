const Feedback = require("../models/userResponse");
const Form = require("../models/feedbackForm");
const transporter = require("../utils/emailService");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/../config.env` });

exports.storeFeedback = async (req, res) => {
  try {
    console.log(req.body);
    const { formId, userDetails, responses, overallRating } = req.body;
    const { name, email } = userDetails;

    const feedback = await Feedback.create({
      formId,
      name,
      email,
      responses,
      overallRating,
    });

    await Form.findByIdAndUpdate(formId, { $inc: { response: 1 } });


    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for your feedback!",
      text: `Dear ${name},\n\nThank you for submitting your feedback. We appreciate your time and input!\n\nBest,\nFeedbackPro Team`,
    };

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Feedback Received",
      text: `Hello Admin,\n\nA new feedback has been submitted by ${name} (${email}).\n`,
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(201).json({
      status: "success",
      data: {
        feedback,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getResponse = async (req, res) => {
  try {
    const allResponse = await Feedback.find({ formId: req.params.id });

    res.status(200).json({
      status: "success",
      data: {
        allResponse,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
