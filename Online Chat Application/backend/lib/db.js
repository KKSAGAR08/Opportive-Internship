const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Mongodb connected ${db.connection.host}`);
  } catch (error) {
    console.log("Cannot connect to Database", error);
  }
};
