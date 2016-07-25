var jsPixelateHover = require('./pixelate.js');
var headroom = require('./headroom.min.js');
var headroomJQuery = require('./jQuery.headroom.min.js');
var headroomJQuery = require('./owl.carousel.min.js');
var formApi = require('./form.api.js');

$('html').removeClass('no-js');

$(document).ready(function() {
  //PIXELATE ON SCROLL CODE
  var imgPixelate = $('#js-pixelate-scroll');

  if (imgPixelate.length > 0) {

    var ctx = jsPixelateCanvas.getContext('2d'),
        img = new Image;
        //value = factor.value;

    img.onload = function() {
      pixelate(0);
    };

    var imgPixelateId = imgPixelate.attr('src');
    img.src = imgPixelateId;

    function pixelate(value) {

      if (value === 0) {
        value = 1;
      }
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
        ctx.drawImage(jsPixelateCanvas, 0, 0, fw, fh, 0, 0, img.width, img.height);
    }

  (function () {
      var previousScroll = 0;

      $(window).scroll(function(){
         var currentScroll = $(this).scrollTop();
         if (currentScroll > previousScroll){
        $('#js-panel-fullwidth .panel-fullwidth-content').addClass('panel-fullwidth-img-text');
         } else {
          $('#js-panel-fullwidth .panel-fullwidth-content').removeClass('panel-fullwidth-img-text');
         }
         previousScroll = currentScroll;
      });
  }());

  $(document).scroll(function() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 450) {
      return;
    }
    var pixelateValue = parseInt(scrollTop / 12);
    pixelate(pixelateValue);

  });
  }
});

$(document).ready(function(){
    //menu: off canvas
    $('.nav-menu-trigger').click(function(event){
        event.stopPropagation();
        $(this).toggleClass('nav-menu-triggered');
        $('.nav-menu').toggleClass('nav-menu-open');
        $('main').toggleClass('main-offcanvas');
    });

    $('.nav-menu').click(function(event){
        event.stopPropagation();
    });

    $(window).click(function(){
      $('.nav-menu-trigger').removeClass('nav-menu-triggered');
        $('.nav-menu').removeClass('nav-menu-open');
        $('main').removeClass('main-offcanvas');
    });

    //menu: current link styling
    function stripTrailingSlash(str) {
      if(str.substr(-1) == '/') {
        return str.substr(0, str.length - 1);
      }
      return str;
    }

    var url = window.location.pathname;
    var activePage = stripTrailingSlash(url);

    $('.nav-menu a').each(function(){
      var currentPage = stripTrailingSlash($(this).attr('href'));

      if (activePage == currentPage) {
        $(this).addClass('nav-active');
      }
    });

    //slider
    $("#slider-testimonial").owlCarousel({
      navigation : true,
       navigationText : false,
      pagination : false,
      slideSpeed : 300,
      singleItem:true
     });

    //tabs
    $(".tab-content").hide();
    $(".tabs li:first").addClass("active-tab").show();
    $(".tab-content:first").show();

    //On Click Event
    $(".tabs li").click(function() {
      $(".tabs li").removeClass("active-tab");
      $(this).addClass("active-tab");
      $(".tab-content").hide();

      var activeTab = $(this).find("a").attr("href");
      $(activeTab).fadeIn();
      return false;
    });

    //red pixel cube at end of blog post
    $(".blog-post-info").children().last().addClass('icon-decorative-pixel');

    //header: sticky
    $(".nav").headroom({
      "offset": 10,
      "tolerance": 5,
      "classes": {
        "initial": "animated",
        "pinned": "slideDown",
        "unpinned": "slideUp"
      }
  });

    //thumbnails which pixelate on hover
  $('.img-pixelate-hover').load(function(){
    $(this).pixelate({
      value : 0.7
    });
  });

  $('#load-more').on('click', function(e) {
    e.preventDefault();
    $('.blog-list-block:hidden').slice(0, 5).fadeIn();
  });

  $('.blog-list-block').slice(0, 5).show();

  //customize twitter feed
  hideTwitterBoxElements();

});

//customize twitter feed
var hideTwitterAttempts = 0;
function hideTwitterBoxElements() {
  setTimeout( function() {
    if ( $('[id*=twitter]').length ) {
      $('[id*=twitter]').each( function(){
        var ibody = $(this).contents().find( 'body' );

        if ( ibody.find( '.timeline .stream .h-feed li.tweet' ).length ) {

        ibody.find( '.timeline .stream .h-feed li.tweet' ).css( 'padding-left', '68px' );

        ibody.find( '.header .avatar' ).css( 'left', '-67px' );

        ibody.find( '.timeline .stream .h-feed li.tweet .p-name' ).css( 'color', '#fff' );
        ibody.find( '.timeline .stream .h-feed li.tweet .p-name' ).css( 'font-family', 'Muli, Helvetica, sans-serif' );
        ibody.find( '.timeline .stream .h-feed li.tweet .p-name' ).css( 'font-size', '16px' );

        ibody.find( '.timeline .stream .h-feed li.tweet .e-entry-title' ).css( 'color', '#fff' );
        ibody.find( '.timeline .stream .h-feed li.tweet .e-entry-title' ).css( 'font-family', 'Muli, Helvetica, sans-serif' );
        ibody.find( '.timeline .stream .h-feed li.tweet .e-entry-title' ).css( 'font-size', '16px' );
        ibody.find( '.timeline .stream .h-feed li.tweet .e-entry-title' ).css( 'line-height', '1.6' );
        ibody.find( '.timeline .stream .h-feed li.tweet .e-entry-title' ).css( 'margin-top', '10px' );
        }
      });
    }
    hideTwitterAttempts++;
    if ( hideTwitterAttempts < 3 ) {
      hideTwitterBoxElements();
    }
  }, 1500);
}
