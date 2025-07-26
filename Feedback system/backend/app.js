const express = require("express");
const jwt = require('jsonwebtoken');
const adminRouter = require('./router/adminrouter')
const userRouter = require('./router/userrouter')
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());


app.use('/admin/form',adminRouter);
app.use('/user',userRouter);


module.exports = app



