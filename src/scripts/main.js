$(document).ready(function(){
    //menu: off canvas
    $('.nav-menu-trigger').click(function(event){
        event.stopPropagation();
        //$(this).toggleClass("nav-icon-active");
        $('.nav-menu').toggleClass('nav-menu-open');
    });

});