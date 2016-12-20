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
function trylogin(){
  var username = $("#username").val();
  var password = $("#password").val();
  console.log(username);
  console.log(password);
  var classesUrl = window.location.origin +'/api/login?username='+username+"&password="+password;
    
    $.ajax({
          url: classesUrl,
          contentType: 'application/json; charset=utf-8',
          cache: false,
          type: "GET",
          success: function(response) {
              console.log(response);
              if (response.status != "NOPE"){
                location.reload();
              }
              else {
                alert("Login failed, try again")
              }
          },
          error: function(xhr) {
            console.log("error")
          }
    });
}

function trylogout(){
  var username = $("#username").val();
  var password = $("#password").val();
  console.log(username);
  console.log(password);
  var classesUrl = window.location.origin +'/api/logout';
    $.ajax({
          url: classesUrl,
          contentType: 'application/json; charset=utf-8',
          cache: false,
          type: "GET",
          success: function(response) {
              console.log(response);
              if (response.status != "NOPE"){
                location.reload();
              }
              else {
                alert("Logout failed, try again")
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
              drawTable(response);
          },
          error: function(xhr) {
            console.log("error")
          }
    });
    console.log("loaded");
    
}

 google.charts.load('current', {'packages': ['datatable','table', 'map', 'corechart']});
 google.charts.setOnLoadCallback(drawTable);
function drawTable(response) {
  
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Class');
  data.addColumn('string', 'Subject');
  data.addColumn('number', 'Capacity');
  data.addColumn('number', 'Students in class');
  data.addColumn('number', 'Percentage attendance');
  
  data.addRows(response.length);
  var total = 0;
  for (var i = 0; i < response.length; i++){
                if (response[i].classe != ""){
                  var assistencia = Math.round(response[i].alumnes *100 / response[i].capacitat); 
                  console.log (assistencia);
                  console.log(total);
                  total += assistencia;
                  data.setCell(i, 0, response[i].classe);
                  data.setCell(i, 1, response[i].assignatura);
                  data.setCell(i, 2, response[i].capacitat);
                  data.setCell(i, 3, response[i].alumnes);
                  data.setCell(i, 4, assistencia);
                }

              }

  var table = new google.visualization.Table(document.getElementById('table_div'));
  table.draw(data, {showRowNumber: true, width: '50%', height: '100%'});

  google.visualization.events.addListener(table, 'select', function() {
   var classesUrl = window.location.origin +'/api/getIDsAlumnesInClass';
    $.ajax({
          url: classesUrl,
          contentType: 'application/json; charset=utf-8',
          cache: false,
          type: "GET",
          success: function(response) {
              console.log(response);
              alertStudents(response);
          },
          error: function(xhr) {
            console.log("error")
          }
    });


  });
}
function alertStudents(response){
  var str = "ID's dels alumnes a la classe A3001:\n \n";
  for (var i = 0; i < response.length; i++){
    str += response[i].id + "\n";
  }
  alert(str);
}
(populateStats)();