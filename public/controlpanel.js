$("#subj").click(function(){
    $("#classes").slideToggle(500);
});

$("#add").click(function(){
    $("#addclasse").slideToggle(500);
});

$("#seestats").click(function(){
    $("#stats").slideToggle(500);
});

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
              	alert("Class subject successfully changed");
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
              	alert("Class subject successfully changed");
              }
          },
          error: function(xhr) {
            console.log("error")
          }
    });

}

(function (){
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
              for (var i = 0; i < response.length; i++){
              	var str = "<div > nom: " + response[i].classe + " capacitat: "+ response[i].capacitat+"</div>"; 
              	$("#stats").append(str);
              }
          },
          error: function(xhr) {
            console.log("error")
          }
    });
    console.log("loaded");
})();