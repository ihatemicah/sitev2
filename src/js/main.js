
// On load fade in animations.
  // Landing page
window.sr = ScrollReveal();
sr.reveal('.intro-paragraph');
sr.reveal('.em-art',{delay: 100});
sr.reveal('.em-thinking_face',{delay: 400});
sr.reveal('.em-video_game',{delay: 600});
sr.reveal('.em-mage',{delay: 1000});

sr.reveal('#yogi-tea',{delay: 400});
sr.reveal('#anime-poster',{delay:400});
sr.reveal('#ring',{delay:500});
sr.reveal('#team-hex',{delay:400});
sr.reveal('.from-them',{delay:400});
sr.reveal('.from-me',{delay:500});
sr.reveal('#social-media',{delay:400});

  // Detailed page.
sr.reveal('.team-hex-hero',{delay:800});
sr.reveal('.detailed-intro-subparagraph',{delay:1000});
sr.reveal('.product-detail-text-1',{delay:1500});
sr.reveal('.product-detail-text-2',{delay:1500});

  // About me.
sr.reveal('.about-me',{delay:1000});

// Tons of projects.
  // Need to figure out the bug on how we can get this to load instantly.
sr.reveal('.image-gallery');
sr.reveal('.detailed-intro-paragraph');


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


//  Scew page on scrolling. - also the selector.
const section = document.querySelector("#scew-animation")

let currentPixel = window.pageYOffset

// Finds where the new position is.
const looper = function() {
  const newPixel =  window.pageYOffset
  const diff = newPixel - currentPixel

  // Speed of scew
  const speed = diff * 0.25

  section.style.transform = "skewY(" + speed + "deg)"

  currentPixel = newPixel

  requestAnimationFrame(looper)
}


$(document).ready(looper);

// Page Transition Call Outs
  $(".animsition-overlay").animsition({
    inClass: 'overlay-slide-in-top',
    outClass: 'overlay-slide-out-top',
    inDuration: 1500,
    outDuration: 800,
    linkElement: '.animsition-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: false,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : true,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });
