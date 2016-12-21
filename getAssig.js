
var request = require("request")
var nomAssig;
request({
    url: 'http://localhost:8080/api/classesByNom/A3001', //URL to hit
    qs: {nom: "A3001", id : 31}, //Query string data
    method: 'GET'
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
    	var d = JSON.parse(response.body);
        nomAssig = d.assignatura;
        console.log(response);
        console.log(nomAssig);
    }
});


