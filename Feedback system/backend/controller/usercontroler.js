const Feedback = require("../models/userResponse");
const Form = require("../models/feedbackForm")

exports.storeFeedback = async (req, res) => {
  try {
    console.log(req.body);
    const { formId, userDetails, responses,overallRating } = req.body;
    const {name,email} = userDetails;


    const feedback = await Feedback.create({
      formId,
      name,
      email,
      responses,
      overallRating
    });

   await Form.findByIdAndUpdate(formId, { $inc: { response: 1 } });


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

exports.getResponse = async (req,res)=>{
   try{
      const allResponse = await Feedback.find({formId:req.params.id});
  
      res.status(200).json({status: "success",
        data: {
          allResponse,
        }})
  
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
}
