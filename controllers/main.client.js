(function () {

  // https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f#.qvmku4qal

   var classesUrl = window.location.origin +'/api/classes';
   var nom = "A4001";
   $.ajax({
          url: classesUrl,
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
  response.forEach( (item, index)=>{
    var nom = item.classe; 
    var capacitat = item.capacitat;
    $("#noms").append("<p> Classe: "+ nom +", Màxima capacitat: "+ capacitat +", actualment hi ha "+ item.alumnes+ " alumnes</p>");
  });
}
  
})();
