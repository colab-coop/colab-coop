$(document).ready(function(){
    //menu: off canvas
    $('.nav-menu-trigger').click(function(event){
        event.stopPropagation();
        $(this).children(".nav-icon").html("&#xf00d");
        $('.nav-menu').toggleClass('nav-menu-open');
    });

});