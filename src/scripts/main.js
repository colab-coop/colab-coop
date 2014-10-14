var myElement = document.querySelector("nav");
var headroom = new Headroom(myElement, {
  "offset": 50,
  "tolerance": 5,
  "classes": {
    "initial": "animated",
    "pinned": "slideDown",
    "unpinned": "slideUp"
  }
});
headroom.init();

$(function() {
  $('#carousel').carouFredSel({
    width: '100%',
    items: {
      visible: 3,
      start: -1
    },
    scroll: {
      items: 1,
      duration: 1000,
      timeoutDuration: 3000
    },
    prev: '#prev',
    next: '#next',
    pagination: {
      container: '#pager',
      deviation: 1
    }
  });
});