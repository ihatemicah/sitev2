
// On load fade in animations.
window.sr = ScrollReveal();
sr.reveal('.intro-paragraph');
sr.reveal('.em-art',{delay: 100});
sr.reveal('.em-thinking_face',{delay: 400});
sr.reveal('.em-video_game',{delay: 600});
sr.reveal('.em-mage',{delay: 1000});

sr.reveal('#yogi-tea',{delay: 400});
sr.reveal('#anime-poster',{delay:800});
sr.reveal('#ring',{delay:1000});
sr.reveal('#team-hex',{delay:1000});
sr.reveal('.from-them'),{delay:2000};
sr.reveal('.from-me'),{delay:4000};
sr.reveal('#social-media',{delay:1000});


$(document).on("scroll", function() {
  // How far from the top
  var pixels = $(document).scrollTop()
  // Controls the speed of the moving
  $("#right-move").css("margin-top", pixels * 0.02 )

});
