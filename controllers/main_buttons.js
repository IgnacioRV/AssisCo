(function () {

   var classesUrl = window.location.origin +'/api/classes/';
   var nom = "A4001";
   $.ajax({
          url: classesUrl+nom,
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

function foo (response){
  // response és un array de classes 
  //$("#noms").append("<p> Classe: "+ nom +", Màxima capacitat: "+ capacitat +"</p>");
  //$("#id").html(response[2].capacitat);
  
  console.log(response);
  
}
  $("#submit").click(() => {
    var className = $("#textField").value;
    console.log(className);
  })

})();