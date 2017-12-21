require('./owl.carousel.min.js');
require('./form.api.js');

var Headroom = require('./headroom.min.js');
var $ = require('jquery');

var Typed = require('typed.js');

$('html').removeClass('no-js');

// takes a canvas element, image, and pixelation value, and
// paints the pixelated image on the canvas element
function pixelate(canvas, img, value) {
  if (!canvas || !img) {
    return;
  }

  var ctx = canvas.getContext('2d');

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
    ctx.imageSmoothingEnabled = false;

  /// draw mini-version of image
  ctx.drawImage(img, 0, 0, fw, fh);

  /// draw the mini-version back up, voila, pixelated
  ctx.drawImage(canvas, 0, 0, fw, fh, 0, 0, img.width, img.height);
}


$(document).ready(function() {

  // setting up pixelation on scroll

  var imgPixelate = $('#js-pixelate-scroll');

  if (imgPixelate.length > 0) {

    var img = new window.Image();
    //value = factor.value;

    var jsPixelateCanvas = document.getElementById('jsPixelateCanvas');

    img.onload = function() {
      pixelate(jsPixelateCanvas, img, 0);
    };

    var imgPixelateId = imgPixelate.attr('src');
    img.src = imgPixelateId;

    var previousScroll = 0;

    $(window).scroll(function(){
      var currentScroll = $(this).scrollTop();
      if (currentScroll > previousScroll){
        $('#js-panel-fullwidth .panel-fullwidth-content')
          .addClass('panel-fullwidth-img-text');
      } else {
        $('#js-panel-fullwidth .panel-fullwidth-content')
          .removeClass('panel-fullwidth-img-text');
      }
      previousScroll = currentScroll;
    });

    $(window).click(function(){
      $('.nav-menu-trigger').removeClass('nav-menu-triggered');
        $('.nav-menu').removeClass('nav-menu-open');
        $('main').removeClass('main-offcanvas');
    });

    // on scroll, pixelate appropriately any elements with
    // id of "jsPixelateCanvas"
    $(document).scroll(function() {
      var scrollTop = $(window).scrollTop();
      if (scrollTop > 450) {
        return;
      }
      var pixelateValue = parseInt(scrollTop / 12);
      pixelate(jsPixelateCanvas, img, pixelateValue);
    });

  }

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
  var test = $("#slider-testimonial").owlCarousel({
    autoPlay: true,
    loop: true,
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

  // grab an element
  var myElement = document.querySelector(".nav");
  // construct an instance of Headroom, passing the element

  var thisheadroom  = new Headroom(myElement, {
    "offset": 10,
    "tolerance": 5,
    "classes": {
      "initial": "animated",
      "pinned": "slideDown",
      "unpinned": "slideUp"
    }
  });

  // initialise
  thisheadroom.init();

  //thumbnails which pixelate on hover
  $('.img-pixelate-hover').load(function () {
    if ($(this).length !== 0) {
      $(this).each(function (x, i) {
        var img = new window.Image();
        img.src = i.src;

        var canvas = document.getElementById(i.dataset.canvasid);

        // the containing div
        var pDiv = i.parentElement.parentElement;

        // current pixelation value
        var level = 0;

        // current interval id
        var iid;

        // animate pixelate on mouseover
        pDiv.addEventListener('mouseover', function () {
          if (iid) {
            window.clearInterval(iid);
          }

          iid = window.setInterval(function () {
            if (level > 44) {
              window.clearInterval(iid);
            } else {
              pixelate(canvas, img, level);
              level++;
            }
          }, 10);
        });

        // animate depixelate on mouseout
        pDiv.addEventListener('mouseout', function () {
          if (iid) {
            window.clearInterval(iid);
          }

          iid = window.setInterval(function () {
            if (level < 1) {
              window.clearInterval(iid);
            } else {
              pixelate(canvas, img, level);
              level--;
            }
          }, 10);
        });

        // set initial pixelation (none)
        pixelate(canvas, img, 0);

      });
    }
  });

  $('#load-more').on('click', function(e) {
    e.preventDefault();
    $('.blog-list-block:hidden').slice(0, 5).fadeIn();
  });

  $('.blog-list-block').slice(0, 5).show();

  //customize twitter feed
  hideTwitterBoxElements();

  // do typing effect
  startTyping();
});

//customize twitter feed
var hideTwitterAttempts = 0;
function hideTwitterBoxElements() {
  window.setTimeout( function() {
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

var strings = '';

if ( window.navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) ) {
  strings = ['It doesn\'t mean anything, if it doesn\'t have heart.^1500']
} else {
  strings = ['if it doesn\'t have heart.^1500', 'It doesn\'t mean anything,^1500']
}

function startTyping() {
  if (!$('.typedjs').length) {
    return;
  }

  var typed = new Typed('.typedjs', {
    strings: strings,
    startDelay: 0,
    typeSpeed: 50,
    backSpeed: 0,
    fadeOut: true,
    loop: true
  });
}