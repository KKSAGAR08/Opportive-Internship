const express = require('express');
const user = require('../controller/usercontroler')
const Router = express.Router();

Router.route('/:id').post(user.storeFeedback).get(user.getResponse);

module.exports = Router