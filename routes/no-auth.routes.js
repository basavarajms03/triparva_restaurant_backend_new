const express = require('express');
const controllers = require('../controllers/no-auth.controller');
const non_auth_routers = express.Router();

non_auth_routers.post('/userlogin', (req, res) => {
    controllers.login(req, res);
});

non_auth_routers.post('/createuser', (req, res) => {
    controllers.createUser(req, res);
});

module.exports = non_auth_routers;