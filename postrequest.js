var request = require("request")

request({
    url: 'http://localhost:8080/api/addalumne/A3001', //URL to hit
    qs: {nom: 'A3001', subject: "Paleontologia"}, //Query string data
    method: 'GET'
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});