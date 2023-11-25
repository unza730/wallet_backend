var express = require('express');
// var userRoutes = require('./userRoutes');
var authRoutes = require('./auth');
var appRoutes = express.Router();

appRoutes.use('/auth', authRoutes);
// appRoutes.use('/users', userRoutes);

module.exports = appRoutes;
