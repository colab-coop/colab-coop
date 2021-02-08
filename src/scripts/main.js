require('./owl.carousel.min.js');
require('./form.api.js');

var Headroom = require('./headroom.min.js');
var $ = require('jquery');


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

  // No-track notification banner
  if (!(window.localStorage.getItem('colab-coop-notrack-notified') === 'true')) {
    var banner = document.createElement('div');
    banner.classList.add('notrack-banner');
    var text = document.createElement('div');
    text.classList.add('notrack-banner__text');
    text.innerHTML = 'To get critical information about the behavior of our visitors, we use Simple Analytics. This analytics software gives us insight about our visitors only in general, but not about individuals by itself, as it does not track visitors and does not store any personal identifiable information.';
var buttonDiv = document.createElement('div');
    var acceptButton = document.createElement('button');
    acceptButton.classList.add('notrack-banner__accept');
    acceptButton.innerHTML = 'OK! <span class="icon-decorative-pixel"></span>';
    banner.appendChild(text);
    buttonDiv.appendChild(acceptButton);
banner.appendChild(buttonDiv);
    document.body.appendChild(banner);

    acceptButton.addEventListener('click', function handleAccept () {
      banner.classList.add('hide');
      window.localStorage.setItem('colab-coop-notrack-notified', 'true');
    });
  }

  // setting up pixelation on scroll
  var imgPixelate = $('#js-pixelate-scroll');
  if (imgPixelate.length > 0) {
    var img = new window.Image();
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
  $("#slider-testimonial").owlCarousel({
    autoPlay: 20000,
    loop: true,
    navigation: true,
    navigationText: false,
    pagination: false,
    singleItem: true
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

  $('#load-more').on('click', function(e) {
    e.preventDefault();
    $('.blog-list-block:hidden').slice(0, 5).fadeIn();
  });

  $('.blog-list-block').slice(0, 5).show();

  // randomize the members list
  randomizeList('.members-block > ul')
  // randomize the eu list
  randomizeList('.eu-block > ul')
  // randomize the friends list
  randomizeList('.friends-block > ul')

});

function randomizeItems(items) {
  var cached = items.slice(0), temp, i = cached.length, rand;
  while(--i) {
      rand = Math.floor(i * Math.random());
      temp = cached[rand];
      cached[rand] = cached[i];
      cached[i] = temp;
  }

  return cached;
}

function randomizeList(query) {
  var list = document.querySelector(query);
  var nodes = list.children, i = 0;
  nodes = Array.prototype.slice.call(nodes);
  nodes = randomizeItems(nodes);
  while(i < nodes.length) {
      list.appendChild(nodes[i]);
      ++i;
  }
  list.style.display="block";
}

