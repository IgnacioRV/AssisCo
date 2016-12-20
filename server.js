var express = require('express');
const fs = require('fs');
var app = express(); 
var path = process.cwd();
app.use('/controllers', express.static(process.cwd() + '/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));

/*

	TODO: 
	Add alumne ID to class
	Count mean attendance rate

*/
app.use('./', express.static(process.cwd()));

// Container for the names of the classes + capacity + current number of students 
var classes = [];

var numalumnes = 0;
// Container for the names of alumnes in the class 
var alumnes = [];

var init = function(){
	
	/* We read from a file named input, 
	
		The classes are stored the following way: 

		className;capacity

		Then we save this classes to the vector classes

	*/

	fs.readFile('./input', 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	  var v = data.split('\n');
	  v.forEach(function (item, index){
	  	var c = {};
	  	console.log(item);
	  	c["nom"] = (item.split(';'))[0];
	  	c["capacitat"] = parseInt((item.split(';'))[1]);
	  	c["alumnes"] = 0;
	  	c["assignatura"] = " - ";
	  	c["ids"] = {};
	  	classes.push(c);
	  });
	});
};

init();

/* 

	SERVER BEHAVIOR

*/
var profes = [{name :"Nacho", password:"1234"},
			  {name :"JP", password:"password"}];

app.get('/' ,function (req, res) {
			res.sendFile(path +'/public/index.html');
		});

app.get('/status',function(req, res){
	var x = {
		"classe" : "A4001",
		"assignatura": "PBE",
		"alumnes" : 4,
		"capacitat" : 40 
	};
	res.send(x);
});
var logged = false;
app.get('/control', function (req, res){
	if (logged) res.sendFile(path +'/public/controlpanel.html');
	else res.sendFile(path +'/public/login.html');
})

app.get('/api/classes/:num', function(req, res){
	var i = parseInt(req.params.num);
	console.log(i);
	console.log(typeof(i));
	if (i < classes.length){
		res.send({	
			"nom" : classes[i].nom,
			"capacitat" : classes[i].capacitat,
			"alumnes" : classes[i].alumnes,
			"assignatura" : classes[i].assignatura
		});
	}
	else {
		res.send({	
			"nom" : "not found",
			"capacitat" : -1
		});
	}
});

app.get('/api/classesByNom/:nom', function(req, res){
	var nom = req.params.nom;
	console.log(nom);
	console.log(typeof(nom));
	var found = false;
	for (var i = 0; i < classes.length && !found; i++)	{
		console.log(classes[i].nom+ " = "+ i);
		console.log(classes[i].nom == nom);	
		if (classes[i].nom == nom){
			found = true; 
			res.send({	
				"nom" : classes[i].nom,
				"capacitat" : classes[i].capacitat,
				"alumnes" : classes[i].alumnes,
				"assignatura" : classes[i].assignatura
			});
			break; 
		}
	}
	if (!found) {
		res.send({	
			"nom" : "not found",
			"capacitat" : -1
		});
	}
});

app.get('/api/classes',function(req, res){
	var x = [];
	for (var i = 0; i < classes.length; i++){ 
		if (classes[i].nom.length != 0)
		x.push({
			"classe" : classes[i].nom,
			"capacitat" : classes[i].capacitat,
			"alumnes": classes[i].alumnes,
			"assignatura": classes[i].assignatura
		});
	}
	res.send(x);
});

app.get('/api/login', function(req, res){
	var query = req.query;
	var found = false;
	for (var i = 0; i<profes.length; i++){
		if (profes[i].name == query.username && profes[i].password == query.password) found = true;
 	}
 	if (!found){
	var status = {
		"status" : "NOPE",
	};
	logged = false;
	res.send(status);
 	}
 	else {
 		var status = {
		"status" : "OK",
		};
		logged = true;
		res.send(status);
 	}
});
app.get('/api/logout', function(req, res){
	var status = {
		"status" : "OK",
	};
	logged = false;
	res.send(status);
});
app.get('/api/addclass', function(req, res){
	var query = req.query;
	var found = false;
	for (var i = 0; i<classes.length; i++){
		if (classes[i].nom == query.nom) found = true;
 	}
 	if (!found){

	var newClass = {
		"nom" : query.nom,
		"capacitat" : parseInt(query.capacitat),
		"alumnes": 0,
		"assignatura" : " - ",
		"ids" : {}
	};
	console.log(newClass);
	classes.push(newClass);
	//write new class to file
	fs.appendFile('input', '\n'+newClass.nom+";"+newClass.capacitat, function (err) { });
	res.send(newClass);	
 	}
 	else {
 		res.send('Class not added');
 	}
});

app.get('/api/setsubject', function(req, res){
	var query = req.query;
	var nom = query.nom;
	var subject = query.subject;

	console.log("nom = " + nom);

	console.log("subject = " + subject);
	// - - - - - - - - - - - - - - - - - - - - - - - - - -

	var found = false;
	for (var i = 0; i < classes.length && !found; i++)	{
		console.log(classes[i].nom+ " = "+ i);
		console.log(classes[i].nom == nom);	
		if (classes[i].nom == nom){
			found = true; 
			classes[i].assignatura = subject;
			classes[i].alumnes = 0;
			res.send({	
				"nom" : classes[i].nom,
				"capacitat" : classes[i].capacitat,
				"alumnes" : classes[i].alumnes,
				"assignatura" : classes[i].assignatura
			});
			break; 
		}
	}
	if (!found) {
		res.send({	
			"nom" : "not found",
			"capacitat" : -1
		});
	}
	// - - - - - - - - - - - - - - - - - - - - - - - - - -
});

app.get('/api/addAlumne/:class', function(req, res){
	var classNum = req.params.class;
	var num;
	for (var i = 0; i < classes.length; i++){ 
		if (classes[i].nom == classNum){
			if (classes[i].capacitat <= classes[i].alumnes) {
				res.send("L'Alumne no s'ha afegit ja que la classe esta plena");
			}
			else {
			classes[i].alumnes++;
			num = classes[i].alumnes;
			res.send("Alumne afegit correctament \n Actualment hi ha " + num + " alumnes a la classe " +classNum);
			}
		}
	}
});

var idStudentsInside = [];
var sumIdStudentsInside = [];

app.get('/api/addAlumne/:class/:id', function(req, res){
	var classNum = req.params.class;
	var id = req.params.id;
	var num;
	for (var i = 0; i < classes.length; i++){ 
		if (classes[i].nom == classNum){
			var idaux = id;
			if (classes[i].capacitat <= classes[i].alumnes) {
				res.send("L'Alumne no s'ha afegit ja que la classe esta plena");
			}
			else {
				var sum = 0; 
				while (id > 0){
					sum += (id%10);
					id = (id - id%10)/10;
				}
				console.log(sumIdStudentsInside);
				if(sumIdStudentsInside.indexOf(sum)==-1){
					classes[i].alumnes++;
					num = classes[i].alumnes;
					idStudentsInside.push(idaux);
					sumIdStudentsInside.push(sum);
					res.send("Alumne afegit correctament \n Actualment hi ha " + num + " alumnes a la classe " +classNum);
			
				}
				else {
					num = num = classes[i].alumnes;
					res.send("Alumne no afegit \n Actualment hi ha " + num + " alumnes a la classe " +classNum);
			
				}
			}
		}
	}
});

app.get('/api/setalumnes', function(req, res){
	var query = req.query;
	var nom = query.nom;
	var alumnes = query.alumnes;
	console.log("nom "+ nom +" alumnes "+alumnes);
	for (var i = 0; i < classes.length; i++){ 
		if (classes[i].nom == nom){
			if (classes[i].capacitat >= alumnes) {
				classes[i].alumnes = alumnes;
			}
			res.send(classes[i]);
		}
	}
});

app.get('/api/getIDsAlumnesInClass', function(req, res){
	var x = [];
	for (var i = 0; i < idStudentsInside.length; i++){ 
		if (classes[i].nom.length != 0)
		x.push({
			"id" : idStudentsInside[i]
		});
	}
	res.send(x);
});

app.get('/:else',function(req, res){
	var x = 5;
	res.send(403);
});
app.listen(process.env.PORT || 8080);