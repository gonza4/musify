'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 4000;

mongoose. connect('mongodb://localhost:27017/musify_db', (err, res) => {
	if(err){
		throw err;
	}
	else{
		console.log("Base de datos iniciada");
		app.listen(port, function(){
			console.log("Servidor Corriendo en puerto " + port);
		});
	}
});
