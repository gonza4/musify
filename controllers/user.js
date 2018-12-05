'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('..models/user');

function saveUser(req, res){
	var user = new User();

	var params = req.body;

	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.role = 'ROLE_USER';
	user.image = 'null';

	if(params.password){

	}
	else{
		res.status(500).send({message: 'Introduzca la contraseña'});
	}
}

module.exports = {
	saveUser
};