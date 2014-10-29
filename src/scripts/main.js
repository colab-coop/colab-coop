/*var ctx = demo.getContext('2d'),
    img = new Image,
    value = factor.value;

img.onload = pixelate;
img.src = 'http://i.imgur.com/goCYyDB.jpg';

function pixelate() {

    /// calculate the factor
    var fw = (img.width / value)|0,
        fh = (img.height / value)|0;
    
    /// turn off image smoothing (prefixed in some browsers)
    ctx.imageSmoothingEnabled =
    ctx.mozImageSmoothingEnabled =
    ctx.msImageSmoothingEnabled =
    ctx.webkitImageSmoothingEnabled = false;
    
    /// draw mini-version of image
    ctx.drawImage(img, 0, 0, fw, fh);
    
    /// draw the mini-version back up, voila, pixelated
    ctx.drawImage(demo, 0, 0, fw, fh, 0, 0, img.width, img.height);
}*/


$(document).ready(function(){
    //menu: off canvas
    $('.nav-menu-trigger').click(function(event){
        event.stopPropagation();
        $(this).children(".nav-icon").html("&#xf00d");
        $('.nav-menu').toggleClass('nav-menu-open');
    });

    $(".blog-post-info").children().last().addClass('icon-decorative-pixel');

    /*$(window).scroll(function(){
    	$(".img-pixelate").pixelate()
    });*/


//$(".blog-post-info").after("<span class='icon-decorative-pixel'></span>");

 /*   var closePixelates = [];
    $(".img-pixelate").each(function(){
    	var that = this;
		closePixelates.push(new ClosePixelation(that, [
		    { shape: 'square', resolution: 0, size: 30, offset: 0, alpha: 0.991 }
		]));
    });

    $('.grid-each').on("mouseover", "canvas", function(e) {
    	var pixelateObj = closePixelates[$(this).index()];
    	pixelateObj.render({
    		{ shape: 'square', resolution: 33, size: 30, offset: 0, alpha: 0.991 }
    	});
    });
*/


});


/*
function init() {
  document.getElementById('portrait-image').closePixelate([
    { resolution : 24 },
    { shape: 'square', resolution: 22, size: 30, offset: 0, alpha: 0.991 }
  ]);
};
window.addEventListener( 'load', init, false);
*/