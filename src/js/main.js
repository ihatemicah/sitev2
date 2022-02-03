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
