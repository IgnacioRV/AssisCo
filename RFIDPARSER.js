/*
run:
killall cat
cat /dev/hidraw0 > output & 
node RFIDPARSER.js 
*/

var className = "A3001"
var serverCall = require ("./postrequest.js");
var fs = require("fs"); //Load the filesystem module
var oldLogSize = 0; 
var working = false; 
function run (){
	while (1){
		if (!working){
			var stats = fs.statSync("output");
			var newLogSize = stats["size"];

	 		if (newLogSize != oldLogSize){
	 			console.log("Size has changed");
				oldLogSize = newLogSize;
		 		showfile();
				//WORK WITH FILE
			}
		}
 	}
}

function showfile(){
	console.log("We're going to work!");
	working = true;
	var exec2 = require('child_process').execSync;
	var result2 = exec2('node test.js');

	var exec = require('child_process').execSync;
	var result = exec('hexdump output');

	var numbers = result.toString().split(" ");
	var counter = 0; 
	var id = 0;
	for (var i = 0; i < numbers.length; i++){
		if (numbers[i].length == 4){
			//console.log("String: "+numbers[i]);
			var value =(parseInt(numbers[i],16)-29) %10;
			
			if(value >= 0  && value <= 9) {
			//console.log("Value: "+value);
			counter++;
			id = id*10 + value;
				if (counter == 11) {
					id = Math.floor(id/10);
					console.log("id = " + id);
					alumnes.push(id);
					// TODO: WORK WITH ID
					id = 0;
					counter = 0;
				}
			}
		}
	}
	serverCall.serverRequest( , alumnes[alumnes.length -1]);
	//console.log(result.toString());
	working = false;
	};

var exec = require('child_process').exec;


run();


