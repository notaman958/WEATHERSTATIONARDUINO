console.log("Loading common.js..");

/*
  Load navbar to #navbar-element
*/
const navbarHtml = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/">Navbar</a>
    <ul class="nav navbar-nav">
        <li class="index">
        <a class="nav-link" href="/index.html">Home</a>
        </li>
        <li class="datadump">
        <a class="nav-link" href="/datadump.html">Datadump</a>
        </li>
        <li class="latest">
        <a class="nav-link" href="/latest.html">Latest</a>
        </li>
        <li class="temperature">
        <a class="nav-link" href="/temperature.html">Temperature</a>
        </li>
        <li class="humidity_out">
        <a class="nav-link" href="/humidity_out.html">Humidity Out</a>
        </li>
        <li class="freechoice">
        <a class="nav-link" href="/freechoice.html">Free Choice</a>
        </li>
        <li class="wind_direction">
        <a class="nav-link" href="/wind_direction.html">Wind Direction</a>
        </li>
    </ul>
</nav>
`;
// find and change tab active
const f=location.pathname;
console.log(f);
const fname=f.replace(/^.*[\\\/]/, '').split('.')[0];
console.log(fname);
$(document).ready(function () {
  if(fname.length==0)
  $('.index').addClass('active');
  $("."+fname).addClass('active');
});
// run nav on every files
const navbarElement = document.getElementById("navbar-element");
navbarElement.innerHTML = navbarHtml;