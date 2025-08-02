const User = require("../Model/users");
const Message = require("../Model/message");
const { io, receiverIDtoSocketID } = require("../lib/socketio");

exports.getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    return res.status(200).json({
      status: "Success",
      data: {
        allUsers,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMessages = async (req, res) => {
  const secondPerson = req.params.id;
  const firstPerson = req.user._id;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: firstPerson, receiverId: secondPerson },
        { senderId: secondPerson, receiverId: firstPerson },
      ],
    });

    return res.status(200).json({
      status: "Success",
      data: {
        messages,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.sendMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;

    const { text } = req.body;

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
    });

    await newMessage.save();

    const receiveridtosocketid = await receiverIDtoSocketID(receiverId);


    if (receiveridtosocketid) {
      // console.log('Emitting newMessage to socket:', receiveridtosocketid)
      // console.log(newMessage)
      const h = io.to(receiveridtosocketid).emit("newMessage", newMessage);
      // console.log(h);
    }
    
    return res.status(201).json({
      status: "Success",
      data: {
        newMessage,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
