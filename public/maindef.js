var nom = "";

function main(){
  $('.floor').click(function(){
  	var floor = this.id;
  	console.log("floor = "+floor);
  });

  $('.classe').click(function(){
  	var classe = this.id;

  	console.log("classe = "+classe);

  });
  $('.building').click(function(){
  	var building = this.id;

  	console.log("building = "+building);
  });

  $('.skillset').fadeIn(1000);
  //$('.projects').hide();
}
$(document).ready(main);