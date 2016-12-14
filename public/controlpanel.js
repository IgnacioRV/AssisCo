$("#subj").click(function(){
    $("#classes").slideToggle(500);
});

$("#add").click(function(){
    $("#addclasse").slideToggle(500);
});

$("#setAlumnes").click(function(){
    $("#setAlumnesDiv").slideToggle(500);
});

$("#seestats").click(function(){
	populateStats();
    $("#stats").slideToggle(500);
});

function setAlumnes(){
  var classname = $("#cname3").val();
  var alumnes = $("#alumnes").val();
  console.log(classname);
  console.log(alumnes);
  var classesUrl = window.location.origin +'/api/setalumnes?nom='+classname+"&alumnes="+alumnes;
    
    $.ajax({
          url: classesUrl,
          contentType: 'application/json; charset=utf-8',
          cache: false,
          type: "GET",
          success: function(response) {
              console.log(response);
              if (response.alumnes == alumnes){
                //alert("Number of students successfully changed");
                populateStats();
              }
          },
          error: function(xhr) {
            console.log("error")
          }
    });


  

}



function changesubject(){
	var classname = $("#cname").val();
	var subj = $("#newSubj").val();
	console.log(classname);
	console.log(subj);
  var classesUrl = window.location.origin +'/api/setsubject?nom='+classname+"&subject="+subj;
    
    $.ajax({
          url: classesUrl,
          contentType: 'application/json; charset=utf-8',
          cache: false,
          type: "GET",
          success: function(response) {
              console.log(response);
              if (response.capacitat != "-1"){
                //alert("Class subject successfully changed");
                populateStats();
              }
          },
          error: function(xhr) {
            console.log("error")
          }
    });
	
}

function run(){
	var classname = $("#cname2").val();
	var capacitat = $("#capacity").val();
	console.log(classname);
	console.log(subj);
	var classesUrl = window.location.origin +'/api/addclass?nom='+classname+"&capacitat="+capacitat;
    
    $.ajax({
          url: classesUrl,
          contentType: 'application/json; charset=utf-8',
          cache: false,
          type: "GET",
          success: function(response) {
              console.log(response);
              if (response.capacitat != "-1"){
              	//alert("Class successfully added");
              	populateStats();
              }
          },
          error: function(xhr) {
            console.log("error")
          }
    });

}
function populateStats (){
	console.log("loading...");
	var classesUrl = window.location.origin +'/api/classes';
    $.ajax({
          url: classesUrl,
          contentType: 'application/json; charset=utf-8',
          cache: false,
          type: "GET",
          success: function(response) {
              console.log(response);
              $("#stats").text("");
              var total = 0;
              for (var i = 0; i < response.length; i++){
                if (response[i].classe != ""){
                  var assistencia = Math.round(response[i].alumnes *100 / response[i].capacitat); 
                  console.log (assistencia);
                  console.log(total);
                  total += assistencia;
                	var str = "<div > Name: " + response[i].classe + " Capacity: "+ response[i].capacitat; 
                	str+= "<br> Subject: " + response[i].assignatura + " Current number of students: "+ response[i].alumnes+" Attendance rate: "+assistencia+"%</div>" 
                  $("#stats").append(str);
                }
              }
              console.log(total);
              var str = "<div >Average attendance rate: "+ Math.round(total / response.length) +"%</div>" 
                $("#stats").append(str);
              
          },
          error: function(xhr) {
            console.log("error")
          }
    });
    console.log("loaded");
}

(populateStats)();