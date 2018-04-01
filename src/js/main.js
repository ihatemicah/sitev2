
// On load fade in animations.
  // Landing page
window.sr = ScrollReveal();
sr.reveal('.intro-paragraph');
sr.reveal('.em-art',{delay: 100});
sr.reveal('.em-thinking_face',{delay: 400});
sr.reveal('.em-video_game',{delay: 600});
sr.reveal('.em-mage',{delay: 1000});

sr.reveal('#yogi-tea',{delay: 400});
sr.reveal('#anime-poster',{delay:800});
sr.reveal('#ring',{delay:900});
sr.reveal('#team-hex',{delay:800});
sr.reveal('.from-them',{delay:2000});
sr.reveal('.from-me',{delay:4000});
sr.reveal('#social-media',{delay:400});

// Detailed page.
sr.reveal('.team-hex-hero',{delay:800});

// Detect mobile
var mobile = false;

function isMobile() {
if (window.matchMedia("(max-width: 667px)").matches) {
    mobile = true;
    console.log('This is mobile.')
  } else {
    mobile = false;
    console.log('This is desktop.')
  }
}

isMobile();

if (mobile === false) { // check for desktop
    $(document).on("scroll", function() {
    var pixels = $(document).scrollTop()
    // Controls the speed of the moving
    $("#right-move").css("margin-top", pixels * 0.02)});

  } else { // stops animations
    var pixels = $(document).scrollTop()
    $("#right-move").css("margin-top", pixels * 0.00);
       }
