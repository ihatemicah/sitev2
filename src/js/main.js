
// On load fade in animations.
  // Landing page
window.sr = ScrollReveal();
sr.reveal('.intro-paragraph');
sr.reveal('.em-art',{delay: 100});
sr.reveal('.em-thinking_face',{delay: 400});
sr.reveal('.em-video_game',{delay: 600});
sr.reveal('.em-mage',{delay: 1000});

sr.reveal('#yogi-tea',{delay: 200});
sr.reveal('#anime-poster',{delay:200});
sr.reveal('#ring',{delay:200});
sr.reveal('#team-hex',{delay:200});
sr.reveal('.from-them',{delay:200});
sr.reveal('.from-me',{delay:200});
sr.reveal('#social-media',{delay:200});

  // Detailed page.
sr.reveal('.team-hex-hero',{delay:200});
sr.reveal('.detailed-intro-subparagraph',{delay:200});
sr.reveal('.product-detail-text',{delay:200});
sr.reveal('.project-image-container',{delay:200});
sr.reveal('.chocolat-parent',{delay:200});


  // About me.
sr.reveal('.about-me',{delay:200});
sr.reveal('.profile-image',{delay:200});

// Tons of projects.
  // Need to figure out the bug on how we can get this to load instantly.
sr.reveal('.image-gallery');
sr.reveal('.detailed-intro-paragraph');
sr.reveal('#text-section',{delay:200});


// Item page
sr.reveal ('.item',{delay:400});

// Footer
 sr.reveal('.custom-footer',{delay:400});


// Detect mobile for turning off the parralax.
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


//  Scew page on scrolling. - also the selector.
const section = document.querySelector("#scew-animation")

let currentPixel = window.pageYOffset

// Finds where the new position is.
const looper = function() {
  const newPixel =  window.pageYOffset
  const diff = newPixel - currentPixel

  // Speed of scew
  const speed = diff * 0.05

  section.style.transform = "skewY(" + speed + "deg)"

  currentPixel = newPixel

  requestAnimationFrame(looper)
}
$(document).ready(looper);

// Chocolat lightbox plugin
$(document).ready(function(){
  $('.chocolat-parent').Chocolat();
});