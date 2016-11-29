(function () {

   
$(document).keypress(function(e) {
    if(e.which == 13) {
        getInfo();
    }
});
  $("#submit").click(() => {
    getInfo();
  });

})();

/*
var nomClasse = "";
$("fiqqf").click(()=>{
  nomClasse += this.val();
});

*/

function foo (response){
  //$("#noms").append("<p> Classe: "+ nom +", Màxima capacitat: "+ capacitat +"</p>");
  //$("#id").html(response[2].capacitat);
  console.log(response);
  $("#info").text(response.capacitat);
};

function getInfo() {
  var className = $("#input").val();
    console.log(className);
    var classesUrl = window.location.origin +'/api/classesByNom/';
    
    $.ajax({
          url: classesUrl+className,
          /* 
          data: { 
              "dd": 321, 
              "aa": "fff", 
              "opt2": "fqoehuqofh"
          },
          */
          contentType: 'application/json; charset=utf-8',
          cache: false,
          type: "GET",
          success: function(response) {
              foo(response);
          },
          error: function(xhr) {
            console.log("error")
          }
    });
  };