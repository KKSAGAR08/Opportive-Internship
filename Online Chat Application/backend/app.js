const express = require("express")
const dotenv  = require("dotenv")
const userAuth = require('./Router/userauth')
const userMessage = require('./Router/usermessage')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {app} = require('./lib/socketio')

// const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'https://online-chat-application-psi.vercel.app',
  credentials: true
}));

app.use('/api/auth',userAuth);
app.use('/api/message',userMessage);

module.exports = app

