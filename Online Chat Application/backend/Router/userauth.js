const express = require('express')
const Router = express.Router()
const user = require('../Controller/userauthControler')
const {protectRoute} = require('../Middleware/protectRoute')

Router.route('/signup').post(user.signUP);

Router.route('/login').post(user.logIN);

Router.route('/logout').post(user.logOUT)

Router.route('/check').get(protectRoute,user.checkAuth);

module.exports = Router