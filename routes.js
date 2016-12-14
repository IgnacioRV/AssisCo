function route(app){
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
}
module.exports(route);