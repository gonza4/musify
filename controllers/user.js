'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

function saveUser(req, res){
	var user = new User();

	var params = req.body;

	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.role = 'ROLE_ADMIN';
	user.image = 'null';

	if(params.password){
		bcrypt.hash(params.password, null, null, function(err, hash){
			user.password = hash;
			if(user.name != null && user.surname != null && user.email != null){
				User.findOne({email: user.email.toLowerCase()}, (err, user) => {
					if(err){
						res.status(500).send("Error en la peticion");
					}else{
						if(user){
							res.status(404).send("Este email ya se encuentra en uso");
						}else{
							user.save((err, userStored) => {
								if(err){
									res.status(500).send({message: 'Error al guardar el usuario'});
								}else{
									if(userStored){
										res.status(200).send({message: 'Usuario guardado correctamente'});
										res.send(userStored);		
									}else{
										res.status(404).send({message: 'No se ha podido guardar el usuario'});
									}
								}
							});
						}
					}
				});
			}else{
				res.status(200).send({message: 'Rellene todos los campos'});
			}
		});
	}
	else{
		res.status(200).send({message: 'Introduzca la contraseña'});
	}
}

function loginUser(req, res){
	var params = req.body;

	var email = params.email;
	var password = params.password;

	User.findOne({email: email.toLowerCase()}, (err, user) => {
		if(err){
			res.status(500).send("Error en la peticion");
		}else{
			if(user){
				bcrypt.compare(password, user.password, (err, check) => {
					if(check){
						if(params.gethash){

						}else{
							res.status(200).send({user});
						}
					}else{
						res.status(404).send({message: "Contraseña incorrecta"});
					}
				});
			}else{
				res.status(404).send("El usuario no existe");
			}
		}
	});
}

module.exports = {
	saveUser,
	loginUser
};