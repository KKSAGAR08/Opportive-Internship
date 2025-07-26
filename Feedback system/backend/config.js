module.exports = {
  port: process.env.PORT || 3000,
  email: {
    user: process.env.EMAIL_USER || "siddharthbendigeri238@gmail.com",
    pass: process.env.EMAIL_PASS || "gfec zwkx egbp txpq",
    admin: process.env.ADMIN_EMAIL || "siddharthbendigeri238@gmail.com",
  },
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/feedback-app",
};



