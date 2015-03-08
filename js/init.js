
  "use strict";
     var image = "images/bg1.jpg";
 
  $(window).load(function () {
      $("#preload").css({
          display: 'none'
      });
      $("body").removeClass("preload");
      setUpSections();
    
      /* Title Rotator */
      var options = {
          "speed": 4000, // Rotate every 4 seconds
          "transition_speed": 500, // Fade in/out has a .5 second duration
          "sub_selector": ".rotate"
      };
      $("#rotate").rotator(options);
      
      snowInit();
      
      /* Navigation */
      $('.navigation .move a').click(function () {

          if (!isDesktop()) return;

          var target = $(this).attr('href');
          openContent(target, $(target).attr('data-direction'));
          return false;
      });
      
      $('.close').click(function () {
          closeContent($('section.active').attr('data-direction'));
          return false;
      });
  });

  $.backstretch([image]); 


  $(document).keyup(function (e) {
      if (!isDesktop()) return;
      if (e.keyCode == 38) {
          if ($('#subscribe').hasClass('active')) closeContent($('section.active').attr('data-direction'));
      }
      if (e.keyCode == 40) {
          if (!$('section.active').length) openContent('#subscribe');
          else if ($('#brands').hasClass('active') && !$('#subscribe').hasClass('active')) closeContent($('section.active').attr('data-direction'))
      }

      if (e.keyCode == 37) {
          if (!$('section.active').length) openContent('#about');
          else if ($('#contact').hasClass('active') && !$('#about').hasClass('active')) closeContent($('section.active').attr('data-direction'));
      }

      if (e.keyCode == 39) {
          if (!$('section.active').length) openContent('#contact');
          else if ($('#about').hasClass('active') && !$('#contact').hasClass('active')) closeContent($('section.active').attr('data-direction'));
      }

      if (e.keyCode == 27) {
          closeContent($('section.active').attr('data-direction'))
      }

  });

  function setUpSections() {
      var sections = document.getElementsByTagName('body')[0].getElementsByTagName('section');

      for (var i = 0; i < sections.length; i++) {

          switch (sections[i].getAttribute('data-direction')) {

          case "from-bottom": // Marques
              var _position = {
                  "top": "100%"
              };
              var _destination = {
                  top: "0"
              };
              var _headerDestination = {
                  top: "-100%"
              };
              var _headerOrigin = {
                  "top": "0"
              };
              break;

          case "from-left": // about
              var _position = {
                  "left": "-100%",
                  "right": "100%"
              };
              var _destination = {
                  "left": "0",
                  "right": "0"
              };
              var _headerDestination = {
                  "left": "100%"
              };
              var _headerOrigin = {
                  "left": "0"
              };
              break;

          case "from-right": // IG
              var _position = {
                  "left": "100%"
              };
              var _destination = {
                  "left": "0"
              };
              var _headerDestination = {
                  "left": "-100%"
              };
              var _headerOrigin = {
                  "left": "0"
              };
              break;

          }

          sections[i].positions = _position;
          sections[i].destinations = _destination;
          sections[i].headerDestinations = _headerDestination;
          sections[i].headerOrigins = _headerOrigin;

      }
  }

  function openContent(_target, _direction) {

      if (!isDesktop()) return;

      var _element = document.querySelector(_target);

      $(_target).css(_element.positions).css({
          "z-index": 2
      }).animate(_element.destinations, "easeOutQuint", function () {
          $(_target).addClass('active')
      });
      $('header').animate(_element.headerDestinations, "easeOutQuint");

  }

  function closeContent(_direction) {

      var _target = 'section.active';
      var _element = document.querySelector(_target);

      $(_target).removeClass('active').delay(300).animate(_element.positions, "easeOutQuint", function () {
          $(this).css({
              "z-index": -99999
          })
      });
      $('header').delay(300).animate(_element.headerOrigins, "easeOutQuint");

  }

  function isDesktop() {
      if ($(window).width() >= 768) return true;
      else return false;
  }
 
  
  
