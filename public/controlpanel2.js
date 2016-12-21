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
              //$("#stats").text("");
              $("#classTable").find('tbody').text("");
              $("#classTable").find('tbody')
                .append($('<tr>')
                    .append($('<td>')
                            .append(" Class ")
                        )
                    .append($('<td>')
                            .append(" Capacity ")
                        )
                    .append($('<td>')
                            .append(" Subject ")
                        )
                    .append($('<td>')
                            .append(" Students in class ")
                        )
                     .append($('<td>')
                            .append(" Attendance rate ")
                        )
                    );
              var total = 0;
              for (var i = 0; i < response.length; i++){
                if (response[i].classe != ""){
                  var assistencia = Math.round(response[i].alumnes *100 / response[i].capacitat); 
                  console.log (assistencia);
                  console.log(total);
                  total += assistencia;
                	$("#classTable").find('tbody')
                    .append($('<tr>')
                        .append($('<td>')
                            .append(response[i].classe)
                        )
                    .append($('<td>')
                            .append(response[i].capacitat)
                        )
                    .append($('<td>')
                            .append(response[i].assignatura)
                        )
                    .append($('<td>')
                            .append(response[i].alumnes)
                        )
                    .append($('<td>')
                            .append(assistencia + "%")
                        )
                    );
                }

              }
              console.log(total);
              var str = "<div >Average attendance rate: "+ Math.round(total / response.length) +"%</div>" 
              $("#classTable").find('tbody').append(str);
              
          },
          error: function(xhr) {
            console.log("error")
          }
    });
    console.log("loaded");
}

(populateStats)();