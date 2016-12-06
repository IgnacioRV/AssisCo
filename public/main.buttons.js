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