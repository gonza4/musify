'use strict'

var jwt = require('jwt-simple');
var moment =require('moment');
var secret = 'secret_key';

exports.ensureAuth = function(req, res, next){
	if(! req.headers.authorization){
		return res.status(403).send({message: "La cabecera no posee autenticacion"});
	}

	var token = req.headers.authorization.replace(/['"]+/g, '');

	try{
		var payload = jwt.decode(token, secret);

		if(payload.exp <= moment().unix()){
			return res.status(401).send({message: "El token ha expirado"});	
		}
	}catch(e){
		console.log(e);
		return res.status(404).send({message: "Token no valido"});
	}

	req.user = token;

	next();
};