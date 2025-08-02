const express = require('express')
const Router = express.Router()
const {protectRoute} = require('../Middleware/protectRoute')
const message = require('../Controller/usermessageControler')


Router.route('/users').get(protectRoute,message.getAllUsers);
Router.route('/:id').get(protectRoute,message.getMessages);

Router.route('/send/:id').post(protectRoute,message.sendMessages);
module.exports = Router