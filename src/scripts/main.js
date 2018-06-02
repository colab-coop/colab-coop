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

	if (window.localStorage.getItem('colab-coop-gdpr-accept') === 'true') {
		startTracking();
	} else if (window.localStorage.getItem('colab-coop-gdpr-accept') !== 'false') {
		// GDPR banner
		var banner = document.createElement('div');
		banner.classList.add('gdpr-banner');
		var text = document.createElement('div');
		text.classList.add('gdpr-banner__text');
		text.innerHTML = 'Hello! CoLab collects data to personalize your experience on our website. By continuing to use this site, you consent to our policy.';
    var buttonDiv = document.createElement('div');
		var acceptButton = document.createElement('button');
		acceptButton.classList.add('gdpr-banner__accept');
		acceptButton.innerHTML = 'Accept';
		var declineButton = document.createElement('button');
		declineButton.classList.add('gdpr-banner__decline');
		declineButton.innerHTML = 'Decline';
		banner.appendChild(text);
		buttonDiv.appendChild(acceptButton);
		buttonDiv.appendChild(declineButton);
    banner.appendChild(buttonDiv);
		document.body.appendChild(banner);

		acceptButton.addEventListener('click', function handleAccept () {
			banner.classList.add('hide');
			window.localStorage.setItem('colab-coop-gdpr-accept', 'true')
			startTracking();
		});

		declineButton.addEventListener('click', function handleDecline () {
			banner.classList.add('hide');
			window.localStorage.setItem('colab-coop-gdpr-accept', 'false')
		});
	}

  function startTracking () {

    // Google Analytics
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-24419918-2']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

    // CrazyEgg
    setTimeout(function(){var a=document.createElement("script");
    var b=document.getElementsByTagName("script")[0];
    a.src=document.location.protocol+"//script.crazyegg.com/pages/scripts/0050/3821.js?"+Math.floor(new Date().getTime()/3600000);
    a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}, 1);

		// Twitter
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

		// Disqus
		/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
		var disqus_shortname = 'colabcoop'; // required: replace example with your forum shortname

		/* * * DON'T EDIT BELOW THIS LINE * * */
		(function() {
		  var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
		  dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
		  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
		})();

		// Google Tag Manager
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-T6DZM3');

		// Blog post twitter
		var twit = document.createElement('script')
		twit.setAttribute('src', '//platform.twitter.com/widgets.js')
		var bptc = document.querySelector('.blog-post-twitter-container')
    if (bptc) {
      bptc.appendChild(twit)
    }
  }


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