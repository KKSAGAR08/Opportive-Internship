const Form = require("../models/feedbackForm");
const morgan = require("morgan");
var jwt = require("jsonwebtoken");

morgan("tiny");
// console.log(morgan)
const SECRET_KEY = "secret123";

exports.authenticateAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (email !== "admin@feedbackpro.com" && password !== "helloadmin") {
    res.status(401).json({
      status: "failure",
      message: "Invalid authentication",
    });
  }

  const payload = {
    email,
    role: "admin",
  };

  var token = jwt.sign(payload, SECRET_KEY);

  res.status(200).json({
    status: "success",
    data:{
      token
    }
  });
};
exports.createNewForm = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      formQuestions: questions,
      overallRating,
    } = req.body;

    const form = await Form.create({
      title,
      description,
      status,
      questions,
      overallRating,
    });

    res.status(201).json({ message: "Form created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllForms = async (req, res) => {
  try {
    const allForms = await Form.find();

    res.status(200).json({
      status: "success",
      data: {
        allForms,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSpecificForm = async (req, res) => {
  try {
    const formData = await Form.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        formData,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSpecificForm = async (req, res) => {
  try {
    const { title, description, status, questions, overallRating } = req.body;
    const formId = req.params.id;

    const updatedForm = await Form.findByIdAndUpdate(
      formId,
      {
        title,
        description,
        status,
        questions,
        overallRating,
      },
      { new: true } // Return the updated document
    );
    res.status(200).json({
      status: "success",
      message: "Form updated successfully",
      data: {
        formData: updatedForm,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
