  // include title tags in everything
var a;
function show_hide() {
  if(a==1)
    {
      document.getElementById("reading-more").style.display ="none";
      document.getElementById("read-more-button").style.display ="block";
      return a=0;
    }
  else 
    {
      document.getElementById("reading-more").style.display ="flex";
      document.getElementById("read-more-button").style.display ="none";
      return a=1;
    }
}

// luxon - superhi tutorial for pulling timezones https://youtu.be/2Q07rMdB1oA
// had to run two different functions to target both elements.
const locations = document.querySelectorAll("div.ticker div.ticker-item")
const updateTimes = function() {
  locations.forEach(location => {
    const output = document.querySelector("output.mobile-timezone")
    const now = luxon.DateTime.now().setZone("America/Vancouver")
    output.innerHTML = now.toFormat("HH:mm:ss")
  })
}
const updateTimesDesktop = function() {
  locations.forEach(location => {
    const output = document.querySelector("output.desktop-timezone")
    const now = luxon.DateTime.now().setZone("America/Vancouver")
    output.innerHTML = now.toFormat("HH:mm:ss")
  })
}

updateTimes()
setInterval(function () {
  updateTimes()
  updateTimesDesktop()
}, 1000)