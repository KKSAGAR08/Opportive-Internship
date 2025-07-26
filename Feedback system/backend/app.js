const express = require("express");
const { sendFeedbackEmail } = require("./utils/emailService");
const jwt = require('jsonwebtoken');
// const Feedback = require("./models/Feedback");
const adminRouter = require('./router/adminrouter')
const userRouter = require('./router/userrouter')
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());


// Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// View engine setup
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// Routes

app.use('/admin/form',adminRouter);
app.use('/user',userRouter);


module.exports = app


// app.get("/submit", (req, res) => {
//   res.render("feedback-form");
// });

// app.post("/submit-feedback", async (req, res) => {
//   try {
//     const feedback = new Feedback(req.body);
//     await feedback.save();
//     await sendFeedbackEmail(feedback);
//     res.render("success", { message: "Thank you for your feedback!" });
//   } catch (error) {
//     console.error("Error submitting feedback:", error);
//     res.render("error", {
//       message: "An error occurred while submitting your feedback.",
//     });
//   }
// });

// // Admin route
// app.get("/admin", async (req, res) => {
//   try {
//     const feedbacks = await Feedback.find().sort({ date: -1 });
//     res.render("admin", { feedbacks });
//   } catch (error) {
//     console.error("Error fetching feedback:", error);
//     res.render("error", {
//       message: "An error occurred while fetching feedback.",
//     });
//   }
// });

// app.get("/about", (req, res) => {
//   res.render("about");
// });


