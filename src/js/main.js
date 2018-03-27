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
sr.reveal('.from-them'),{delay:2000};
sr.reveal('.from-me'),{delay:4000};

// Credits to Orthonormai - Animation on scrollreveal

// animation home
function parralaxAnimation() {
    var perc = calcScrollPerc(),
        colLH = $('#left-move').height(),
        colRH = $('#right-move').height(),
        diffH = perc * Math.abs(colLH - colRH) - 100;
        // animate the smallest column
        if (colLH > colRH) { // right colum smaller
            $("#right-move").css({ "transform": "translateY(+" + diffH + "px)" });
        } else if (colRH > colLH) { // left colum smaller
            $("#left-move").css({ "transform": "translateY(+" + diffH + "px)" });
        }
}

parralaxAnimation();
//  Checking if mobile code :)
// if (mobile === false) { // check for desktop
// } else { // restore original position on mobile
//     $("#col-right").css({ "transform": "translateY(0)" });
//     $("#col-left").css({ "transform": "translateY(0)" });
// }
