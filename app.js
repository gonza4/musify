'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// rutas
var userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// rutas base
app.use('/api', userRoutes);

module.exports = app;