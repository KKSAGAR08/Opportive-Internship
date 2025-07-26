const express = require('express')
const admin = require('../controller/admincontroler')
const Router = express.Router();

Router.route('/login').post(admin.authenticateAdmin)

Router.route('/create').post(admin.createNewForm);

Router.route('/').get(admin.getAllForms)

Router.route('/:id').get(admin.getSpecificForm).put(admin.updateSpecificForm);

module.exports = Router