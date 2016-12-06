var nom = "";

function foo (response){
  //$("#noms").append("<p> Classe: "+ nom +", Màxima capacitat: "+ capacitat +"</p>");
  //$("#id").html(response[2].capacitat);
  console.log(response);
  $("#capacitat").append(response.capacitat);
  $('#numAlumnes').append(response.numalumnes);   /* buscar com es diu a server  */
  $('#subject').append(response.subject);   /* buscar como es diu al server */
};

function main(){

  $('.skillset').fadeIn(1000);
  
  $('#floors').hide();
  $('#classes').hide();
  $('#info').hide();
  $('#contact').hide();
  $('#aboutUs').hide();
  /*console.log("nombre ="+nom);   ERA PER COMPROVAR*/

  $('.building').click(function(){ 
    $('#floors').show();   
    $('#buildings').hide();
    $('#classes').hide();    
    $('#contact').hide();
    $('#aboutUs').hide();
    

    var building = this.id;
    nom=building;
    console.log("building = "+building);
  });

  $('.floor').click(function(){
    $('#classes').show();   
    $('#buildings').hide(); 
    $('#floors').hide();  
    $('#contact').hide();
    $('#aboutUs').hide();
    
  	var floor = this.id;
    nom+=floor
  	console.log("floor = "+floor);
  });

  $('.classe').click(function(){
    $('#info').show();  
    $('#classes').hide(); 
    $('#buildings').hide(); 
    $('#floors').hide();  
    $('#contact').hide();
    $('#aboutUs').hide();
  	var classe = this.id;
    nom+=classe;
    console.log("nom = "+ nom);
  	console.log("classe = "+classe);

    console.log(nom);
    var classesUrl = window.location.origin +'/api/classesByNom/';
    
    $.ajax({
          url: classesUrl+nom,
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



  });

  $('.campus').click(function(){
    $('#buildings').show();
    $('#floors').hide();
    $('#classes').hide();
    $('#info').hide();
    $('#contact').hide();
    $('#aboutUs').hide();
    nom="";
    /*console.log("nomb="+nom);     ERA PER COMPROVAR  */

  })

  $('.nosotros').click(function(){
    $('#aboutUs').show();
    $('#floors').hide();
    $('#classes').hide();
    $('#info').hide();
    $('#contact').hide();
  })

  $('.contacto').click(function(){
    $('#contact').show();
    $('#floors').hide();
    $('#classes').hide();
    $('#info').hide();
    $('#aboutUs').hide(); 
  })
  

  
  //$('.projects').hide();
}


$(document).ready(main);